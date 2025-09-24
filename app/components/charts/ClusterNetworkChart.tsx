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
    comportamento: string;
    acoes: string[];
    metrics: {
        totalClients: number;
        avgTicket: string;
        frequency: string;
        lastOrder: string;
        totalTicketsAbertos: number;
        totalDescontoConcedido: number;
        mediaNps: number;
        qtdAvaliacoesNps: number;
        qtdContratos: number;
        valorTotalContratado: string;
        mediaDiasResolucaoTicket: number;
    };
    keywords: string[];
}

interface ClusterNetworkChartProps {
    clusters: Cluster[];
    onClusterClick?: (cluster: Cluster) => void;
    selectedCluster?: Cluster | null;
}

export default function ClusterNetworkChart({ clusters, onClusterClick, selectedCluster: externalSelectedCluster }: ClusterNetworkChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const zoomBehavior = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
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
            .range([60, 140]);

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
                    zoomBehavior.current!.transform as any,
                    transform
                );

                setSelectedCluster(d as Cluster);
            });


        // Nome do cluster com quebra de texto
        circles.each(function (d: any) {
            const circle = d3.select(this);
            const radius = sizeScale(d.metrics.totalClients);
            const fontSize = Math.min(16, radius / 2);
            const maxWidth = radius * 1.6; // Largura máxima baseada no raio

            // Função para quebrar texto
            const wrapText = (text: string, width: number) => {
                const words = text.split(' ');
                const lines = [];
                let currentLine = '';

                words.forEach(word => {
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    const testWidth = testLine.length * (fontSize * 0.6); // Aproximação da largura

                    if (testWidth > width && currentLine) {
                        lines.push(currentLine);
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                });

                if (currentLine) {
                    lines.push(currentLine);
                }

                return lines;
            };

            const lines = wrapText(d.name, maxWidth);
            const lineHeight = fontSize * 1.2;
            const totalHeight = lines.length * lineHeight;
            const startY = -totalHeight / 2 + lineHeight / 2;

            lines.forEach((line, i) => {
                circle.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", startY + (i * lineHeight))
                    .attr("fill", "#fff")
                    .attr("font-size", fontSize)
                    .attr("font-weight", "bold")
                    .attr("pointer-events", "none")
                    .text(line);
            });
        });


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
                className={`fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl transform transition-transform duration-300 z-50 ${selectedCluster ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                                className="w-4 h-4 rounded-full mr-3"
                                style={{ backgroundColor: selectedCluster?.color }}
                            />
                            <h2 className="text-xl font-bold text-gray-800">{selectedCluster?.name}</h2>
                        </div>
                        <button
                            onClick={() => setSelectedCluster(null)}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm">{selectedCluster?.comportamento}</p>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
                    {/* Métricas Principais */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">{selectedCluster?.metrics.totalClients}</div>
                            <div className="text-sm text-gray-600">Total de Clientes</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold  text-purple-600">{selectedCluster?.metrics.mediaNps}</div>
                            <div className="text-sm text-gray-600">Média NPS</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold  text-purple-600">{selectedCluster?.metrics.valorTotalContratado}</div>
                            <div className="text-sm text-gray-600">Média valor contratado</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold  text-purple-600">{selectedCluster?.metrics.totalTicketsAbertos}</div>
                            <div className="text-sm text-gray-600">Média tickets abertos</div>
                        </div>
                    </div>

                    {/* Ações Estratégicas */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Ações Estratégicas Recomendadas</h3>
                        <div className="space-y-3">
                            {selectedCluster?.acoes && selectedCluster.acoes.length > 0 ? (
                                selectedCluster.acoes.map((acao, index) => {
                                    return (
                                        <div key={index} className={`flex items-start p-3 bg-purple-50 rounded-lg`}>
                                            <div className={`w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0`} />
                                            <p className="text-sm text-gray-700">
                                                {acao}
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                                    <p className="text-sm text-gray-500">
                                        Nenhuma ação estratégica disponível para este cluster
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
