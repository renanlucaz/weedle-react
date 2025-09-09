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
}

export default function ClusterNetworkChart({ clusters }: ClusterNetworkChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const zoomBehavior = useRef<d3.ZoomBehavior<SVGSVGElement, unknown>>();
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [zoom, setZoom] = useState(1);
    const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);

    // Atualizar dimensões
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

    // Renderização inicial dos clusters (NÃO depende de selectedCluster!)
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

        // Escalas
        const sizeScale = d3
            .scaleSqrt()
            .domain(d3.extent(clusters, (d) => d.metrics.totalClients) as [number, number])
            .range([40, 120]);

        const colorScale = d3
            .scaleOrdinal()
            .domain(clusters.map((d) => d.id))
            .range(clusters.map((d) => d.color));

        // Simulação
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

        // Círculo principal
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
            .on("mouseout", function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("opacity", 0.9)
                    .attr("stroke-width", 3);
            })
            .on("click", function (_, d) {
                const drawerWidth = 320; // largura do drawer
                const svg = d3.select(svgRef.current);
                const { width, height } = dimensions;

                // centro ajustado (considerando o drawer à direita)
                const centerX = (width - drawerWidth) / 2;
                const centerY = height / 2;

                // aplica a transformação
                const transform = d3.zoomIdentity
                    .translate(centerX, centerY)
                    .scale(zoom)
                    .translate(-d.x, -d.y);

                svg.transition().duration(500).call(
                    zoomBehavior.current!.transform,
                    transform
                );

                setSelectedCluster(d as Cluster);
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

        // Atualizar posições
        simulation.on("tick", () => {
            circles.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
        });

        // Zoom/pan
        zoomBehavior.current = d3
            .zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 3])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
                setZoom(event.transform.k);
            });

        svg.call(zoomBehavior.current as any).style("cursor", "grab");

        return () => {
            simulation.stop();
        };
    }, [clusters, dimensions]); // <-- selectedCluster removido daqui ✅

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

            {/* Drawer lateral */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${selectedCluster ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{selectedCluster?.name}</h2>
                    <button
                        onClick={() => setSelectedCluster(null)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                {selectedCluster && (
                    <div className="p-4 space-y-4">
                        <p className="text-gray-600">{selectedCluster.description}</p>
                        <div className="space-y-2 text-sm">
                            <p><strong>Total de Clientes:</strong> {selectedCluster.metrics.totalClients}</p>
                            <p><strong>Ticket Médio:</strong> {selectedCluster.metrics.avgTicket}</p>
                            <p><strong>Frequência:</strong> {selectedCluster.metrics.frequency}</p>
                            <p><strong>Último Pedido:</strong> {selectedCluster.metrics.lastOrder}</p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Palavras-chave:</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedCluster.keywords.map((k) => (
                                    <span
                                        key={k}
                                        className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-lg"
                                    >
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Controles de Zoom */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                    onClick={handleZoomIn}
                    className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    title="Zoom In"
                >
                    ➕
                </button>
                <button
                    onClick={handleZoomOut}
                    className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    title="Zoom Out"
                >
                    ➖
                </button>
                <button
                    onClick={handleReset}
                    className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    title="Reset View"
                >
                    ⟳
                </button>
            </div>

            {/* Indicador de Zoom */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md px-3 py-2">
                <span className="text-sm text-gray-600">Zoom: {Math.round(zoom * 100)}%</span>
            </div>
        </div>
    );
}
