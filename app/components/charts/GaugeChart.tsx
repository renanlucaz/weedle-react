import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GaugeChartProps {
    value: number;
    maxValue?: number;
    width?: number;
    height?: number;
    color?: string;
    backgroundColor?: string;
    title?: string;
}

export default function GaugeChart({
    value,
    maxValue = 100,
    width = 300,   // pode ser 300
    height = 200,  // pode ser 200 (mais retangular)
    color = "#8b5cf6",
    backgroundColor = "#f3f4f6",
    title = "Nível de satisfação",
}: GaugeChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const radius = Math.min(width, height * 2) / 2; // ajusta p/ semicírculo
        const thickness = radius * 0.25;

        const valueScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([-Math.PI / 2, Math.PI / 2]);

        const arcBackground = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2);

        const arcValue = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(valueScale(value));

        // centraliza na largura, mas cola na parte de baixo
        const g = svg
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height})`);

        // fundo
        g.append("path")
            .attr("d", arcBackground as any)
            .attr("fill", backgroundColor);

        // valor
        g.append("path")
            .attr("d", arcValue as any)
            .attr("fill", color);

        // texto percentual embaixo do arco
        g.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0px")
            .style("font-size", `${radius * 0.2}px`)
            .style("fill", "#4b5563")
            .text(`${Math.round((value / maxValue) * 100)}%`);

        // extremos
        g.append("text")
            .attr("x", -radius + 10)
            .attr("y", 35)
            .attr("text-anchor", "start")
            .style("font-size", `${radius * 0.1}px`)
            .style("fill", "#6b7280")
            .text("0");

        g.append("text")
            .attr("x", radius - 10)
            .attr("y", 35)
            .attr("text-anchor", "end")
            .style("font-size", `${radius * 0.1}px`)
            .style("fill", "#6b7280")
            .text(maxValue.toLocaleString());
    }, [value, maxValue, width, height, color, backgroundColor]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
        />
    );
}
