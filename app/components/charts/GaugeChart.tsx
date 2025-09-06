import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GaugeChartProps {
    value: number;
    maxValue?: number;
    width: number;
    height: number;
    color?: string;
    backgroundColor?: string;
    title?: string;
}

export default function GaugeChart({
    value,
    maxValue = 100,
    width,
    height,
    color = "#8b5cf6",
    backgroundColor = "#f3f4f6",
    title = "Nível de satisfação"
}: GaugeChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 20, bottom: 60, left: 20 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left + chartWidth / 2},${margin.top + chartHeight / 2})`);

        // Configurações do gauge
        const radius = Math.min(chartWidth, chartHeight) / 2 - 30;
        const startAngle = -Math.PI / 2; // -90 graus (topo)
        const endAngle = Math.PI / 2; // 90 graus (topo)
        const percentage = value / maxValue;

        // Escala para o arco
        const arcScale = d3.scaleLinear()
            .domain([0, 1])
            .range([startAngle, endAngle]);

        // Função para criar o arco
        const arc = d3.arc<number>()
            .innerRadius(radius - 50)
            .outerRadius(radius)
            .startAngle(startAngle)
            .endAngle(d => d);

        // Arco de fundo (não preenchido)
        g.append("path")
            .datum(endAngle)
            .attr("d", arc)
            .attr("fill", backgroundColor)
            .attr("stroke", "none");

        // Arco preenchido (valor atual)
        g.append("path")
            .datum(arcScale(percentage))
            .attr("d", arc)
            .attr("fill", color)
            .attr("stroke", "none");

        // Valor central
        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("y", 20) // Posicionar um pouco abaixo do centro
            .style("font-size", "2.2rem")
            .style("font-weight", "bold")
            .style("fill", "#666666")
            .style("font-family", "sans-serif")
            .text(`${value}%`);


    }, [value, maxValue, width, height, color, backgroundColor, title]);

    return <svg ref={svgRef}></svg>;
}
