import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface PurchaseEvolutionChartProps {
    data: { month: string; value: number }[];
    width?: number;
    height?: number;
}

export default function PurchaseEvolutionChart({
    data,
    width = 500,
    height = 300
}: PurchaseEvolutionChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;

        // Limpar o SVG anterior
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 20, bottom: 60, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Escalas
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.month))
            .range([0, chartWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.value) || 0, d3.max(data, d => d.value) || 100])
            .range([chartHeight, 0])
            .nice();

        // Criar o grupo principal
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Adicionar a linha
        const line = d3.line<{ month: string; value: number }>()
            .x(d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Adicionar a área
        const area = d3.area<{ month: string; value: number }>()
            .x(d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
            .y0(yScale(0))
            .y1(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Desenhar a área
        g.append("path")
            .datum(data)
            .attr("fill", "url(#areaGradient)")
            .attr("d", area);

        // Desenhar a linha
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#8b5cf6")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Adicionar pontos
        g.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "point")
            .attr("cx", d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.value))
            .attr("r", 4)
            .attr("fill", "#8b5cf6")
            .attr("stroke", "white")
            .attr("stroke-width", 2);

        // Adicionar eixo X
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)")
            .style("font-size", "12px")
            .style("fill", "#6b7280");

        // Adicionar eixo Y
        g.append("g")
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("font-size", "12px")
            .style("fill", "#6b7280");

        // Adicionar gradiente para a área
        const defs = svg.append("defs");
        const areaGradient = defs.append("linearGradient")
            .attr("id", "areaGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        areaGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#8b5cf6")
            .attr("stop-opacity", 0.3);

        areaGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#8b5cf6")
            .attr("stop-opacity", 0.1);

        // Adicionar tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "8px 12px")
            .style("border-radius", "6px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("opacity", 0);

        // Adicionar interatividade aos pontos
        g.selectAll(".point")
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1);
                tooltip.html(`${d.month}: ${d.value}`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this).attr("r", 4);
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

    }, [data, width, height]);

    return (
        <div className="w-full">
            <svg
                ref={svgRef}
                width={width}
                height={height}
                className="w-full h-auto"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </div>
    );
}
