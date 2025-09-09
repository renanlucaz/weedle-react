import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Cluster {
    id: string;
    name: string;
    size: number;
    color: string;
    x: number;
    y: number;
    description: string;
    metrics: {
        totalClients: number;
        avgTicket: string;
        frequency: string;
        lastOrder: string;
    };
    keywords: string[];
}

interface ClusterNetworkChartProps {
    clusters: Cluster[];
    onClusterClick: (cluster: Cluster) => void;
    selectedCluster?: Cluster | null;
}

export default function ClusterNetworkChart({
    clusters,
    onClusterClick,
    selectedCluster,
}: ClusterNetworkChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const zoomBehavior = useRef<d3.ZoomBehavior<SVGSVGElement, unknown>>();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [zoom, setZoom] = useState(1);

    // Atualizar dimensões ao redimensionar
    useEffect(() => {
        const updateDimensions = () => {
            const container = svgRef.current?.parentElement;
            if (container) {
                setDimensions({
                    width: container.clientWidth,
                    height: container.clientHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    // Renderização inicial dos clusters
    useEffect(() => {
        if (!svgRef.current || clusters.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const { width, height } = dimensions;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("class", "chart-group")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Escala de tamanho dos círculos
        const sizeScale = d3
            .scaleSqrt()
            .domain(d3.extent(clusters, (d) => d.metrics.totalClients) as [number, number])
            .range([40, 120]);

        // Escala de cores
        const colorScale = d3
            .scaleOrdinal()
            .domain(clusters.map((d) => d.id))
            .range(clusters.map((d) => d.color));

        // Simulação com forces
        const simulation = d3
            .forceSimulation(clusters as any)
            .force("x", d3.forceX(innerWidth / 2).strength(0.1))
            .force("y", d3.forceY(innerHeight / 2).strength(0.1))
            .force(
                "collision",
                d3.forceCollide().radius((d: any) => sizeScale(d.metrics.totalClients) + 10)
            )
            .force("charge", d3.forceManyBody().strength(-300));

        // Grupos de clusters
        const circles = g
            .selectAll(".cluster-circle")
            .data(clusters)
            .enter()
            .append("g")
            .attr("class", "cluster-circle")
            .style("cursor", "pointer");

        // Círculos principais
        circles
            .append("circle")
            .attr("r", (d) => sizeScale(d.metrics.totalClients))
            .attr("fill", (d: Cluster) => colorScale(d.id) as string)
            .attr("stroke", "#fff")
            .attr("stroke-width", 3)
            .attr("opacity", 0.9)
            .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.1))")
            .on("mouseover", function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("opacity", 1)
                    .attr("stroke-width", 4);
            })
            .on("mouseout", function (event, d) {
                if (selectedCluster?.id !== d.id) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.9)
                        .attr("stroke-width", 3);
                }
            })
            .on("click", function (event, d) {
                event.stopPropagation();
                onClusterClick(d as Cluster);
            });

        // Nome do cluster
        circles
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("fill", "#fff")
            .attr("font-size", (d) =>
                Math.min(14, sizeScale(d.metrics.totalClients) / 4)
            )
            .attr("font-weight", "bold")
            .attr("pointer-events", "none")
            .text((d) => d.name);

        // Número de clientes
        circles
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "1.2em")
            .attr("fill", "#fff")
            .attr("font-size", (d) =>
                Math.min(10, sizeScale(d.metrics.totalClients) / 6)
            )
            .attr("font-weight", "500")
            .attr("pointer-events", "none")
            .text((d) => `${d.metrics.totalClients} clientes`);

        // Atualizar posições da simulação
        simulation.on("tick", () => {
            circles.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        });

        // Animação de entrada
        circles
            .selectAll("circle, text")
            .attr("opacity", 0)
            .transition()
            .duration(800)
            .delay((_, i) => i * 100)
            .attr("opacity", 0.9);

        // Configurar zoom/pan
        zoomBehavior.current = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 3])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
                setZoom(event.transform.k);
            });

        svg.call(zoomBehavior.current as any);
        svg.style("cursor", "grab");

        return () => {
            simulation.stop();
        };
    }, [clusters, dimensions, onClusterClick]);

    // Atualizar destaque do cluster selecionado
    useEffect(() => {
        if (!svgRef.current) return;

        const circles = d3.select(svgRef.current).selectAll(".cluster-circle");

        // Reset
        circles
            .select("circle")
            .attr("opacity", 0.9)
            .attr("stroke-width", 3)
            .attr("stroke", "#fff")
            .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.1))");

        // Highlight
        if (selectedCluster) {
            circles
                .filter((d: any) => d.id === selectedCluster.id)
                .select("circle")
                .attr("opacity", 1)
                .attr("stroke-width", 5)
                .attr("stroke", "#4F46E5")
                .style("filter", "drop-shadow(0 8px 16px rgba(79,70,229,0.3))");
        }
    }, [selectedCluster]);

    // Botões de zoom
    const handleZoomIn = () => {
        if (!svgRef.current || !zoomBehavior.current) return;
        d3.select(svgRef.current)
            .transition()
            .duration(300)
            .call(zoomBehavior.current.scaleBy, 1.2);
    };

    const handleZoomOut = () => {
        if (!svgRef.current || !zoomBehavior.current) return;
        d3.select(svgRef.current)
            .transition()
            .duration(300)
            .call(zoomBehavior.current.scaleBy, 0.8);
    };

    const handleReset = () => {
        if (!svgRef.current || !zoomBehavior.current) return;
        d3.select(svgRef.current)
            .transition()
            .duration(300)
            .call(zoomBehavior.current.transform, d3.zoomIdentity);
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 relative">
            <svg ref={svgRef} className="w-full h-full block" />

            {/* Controles de Zoom */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                    onClick={handleZoomIn}
                    className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    title="Zoom In"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                </button>
                <button
                    onClick={handleZoomOut}
                    className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    title="Zoom Out"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                </button>
                <button
                    onClick={handleReset}
                    className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    title="Reset View"
                >
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </button>
            </div>

            {/* Indicador de Zoom */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-3 py-2">
                <span className="text-sm text-gray-600">Zoom: {Math.round(zoom * 100)}%</span>
            </div>
        </div>
    );
}
