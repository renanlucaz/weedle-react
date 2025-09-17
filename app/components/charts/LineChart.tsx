import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface LineChartData {
    year: string;
    value: number;
}

interface LineChartProps {
    data: LineChartData[];
    width: number;
    height: number;
    color?: string;
    showValues?: boolean;
}

export default function LineChart({
    data,
    width,
    height,
    color = "#8b5cf6",
    showValues = true
}: LineChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 40, bottom: 60, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Escalas
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.year))
            .range([0, chartWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) || 100])
            .nice()
            .range([chartHeight, 0]);

        // Grid horizontal
        g.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(yScale)
                .tickSize(-chartWidth)
                .tickFormat(() => "")
                .ticks(5)
            )
            .selectAll("line")
            .style("stroke", "#9ca3af")
            .style("stroke-opacity", 0.2)
            .style("stroke-width", 1)
            .selectAll(".domain")
            .style("stroke", "none");

        // Linha
        const line = d3.line<LineChartData>()
            .x(d => (xScale(d.year) || 0) + xScale.bandwidth() / 2)
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Adicionar a linha
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 3)
            .attr("d", line);

        // Adicionar pontos
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", d => (xScale(d.year) || 0) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.value))
            .attr("r", 6)
            .attr("fill", color)
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("r", 8)
                    .attr("fill", d3.color(color)?.brighter(0.2)?.toString() || color);

                // Tooltip
                const tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("position", "absolute")
                    .style("background", "rgba(0, 0, 0, 0.8)")
                    .style("color", "white")
                    .style("padding", "8px 12px")
                    .style("border-radius", "4px")
                    .style("font-size", "12px")
                    .style("pointer-events", "none")
                    .style("z-index", "1000")
                    .style("opacity", 0);

                tooltip.transition()
                    .duration(200)
                    .style("opacity", 1);

                tooltip.html(`${d.year}: ${d.value}%`)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 10) + "px");
            })
            .on("mouseout", function () {
                d3.select(this)
                    .attr("r", 6)
                    .attr("fill", color);

                d3.selectAll(".tooltip").remove();
            });

        // Valores nos pontos
        if (showValues) {
            g.selectAll(".value-label")
                .data(data)
                .enter().append("text")
                .attr("class", "value-label")
                .attr("x", d => (xScale(d.year) || 0) + xScale.bandwidth() / 2)
                .attr("y", d => yScale(d.value) - 15)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "600")
                .style("fill", "#6b7280")
                .style("stroke-opacity", 0.1)
                .text(d => `${d.value}%`);
        }

        // Eixo X
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .selectAll("text")
            .style("font-size", "12px")
            .style("fill", "#6b7280")
            .attr("transform", "translate(0, 5)");

        // Eixo Y
        g.append("g")
            .call(d3.axisLeft(yScale).ticks(5).tickSize(0))
            .selectAll("text")
            .style("font-size", "12px")
            .style("fill", "#6b7280")
            .selectAll(".domain")

        g.selectAll(".domain")
            .style("stroke", "#6b7280")
            .style("stroke-opacity", 0.06);

        // Labels dos eixos
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#6b7280")
            .text("NPS (%)");

    }, [data, width, height, color, showValues]);

    return <svg ref={svgRef}></svg>;
}
