import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface HorizontalBarChartHorizontalProps {
    data: { label: string; value: number }[];
    width?: number;
    height?: number;
    color?: string;
    showValues?: boolean;
}

export default function HorizontalBarChartHorizontal({
    data,
    width = 500,
    height = 300,
    color = "#8b5cf6",
    showValues = true
}: HorizontalBarChartHorizontalProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;

        // Limpar o SVG anterior
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 40, bottom: 40, left: 80 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Escalas
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) || 100])
            .range([0, chartWidth])
            .nice();

        const yScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, chartHeight])
            .padding(0.1);

        // Criar o grupo principal
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Adicionar grid vertical PRIMEIRO (para ficar atrás)
        g.append("g")
            .attr("class", "grid")
            .call(d3.axisBottom(xScale)
                .tickSize(-chartHeight)
                .tickFormat(() => "")
                .ticks(4)
            )
            .style("stroke", "#e5e7eb")
            .style("stroke-opacity", 0.08)
            .selectAll(".domain")
            .style("stroke", "none");

        // Adicionar as barras horizontais
        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("y", d => yScale(d.label) || 0)
            .attr("width", d => xScale(d.value))
            .attr("height", yScale.bandwidth())
            .attr("fill", (d, i) => {
                // Gradiente de cores roxas do mais escuro para o mais claro
                const colors = ["#6d28d9", "#8b5cf6", "#a78bfa", "#c4b5fd", "#e9d5ff"];
                return colors[i % colors.length];
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("opacity", 0.8);
                showTooltip(event, `${d.label}: ${d.value.toLocaleString()}`);
            })
            .on("mouseout", function () {
                d3.select(this).attr("opacity", 1);
                hideTooltip();
            });

        // Adicionar valores nas barras (se habilitado)
        if (showValues) {
            g.selectAll(".bar-label")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "bar-label")
                .attr("x", d => xScale(d.value) + 5)
                .attr("y", d => (yScale(d.label) || 0) + yScale.bandwidth() / 2)
                .attr("dy", "0.35em")
                .attr("font-size", "10px")
                .attr("fill", "#374151")
                .attr("font-weight", "500")
                .text(d => d.value.toLocaleString());
        }

        // Adicionar eixo Y (labels das barras)
        g.append("g")
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("font-size", "10px")
            .style("fill", "#6b7280")
            .style("text-anchor", "end")
            .attr("dx", "-0.5em");

        // Adicionar eixo X (valores)
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .style("font-size", "10px")
            .style("fill", "#6b7280");

        // Remover as linhas pretas dos eixos (domain)
        g.selectAll(".domain")
            .style("stroke", "none");

        // Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "8px 12px")
            .style("border-radius", "6px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("z-index", "1000");

        function showTooltip(event: MouseEvent, text: string) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 1);
            tooltip.html(text)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 10) + "px");
        }

        function hideTooltip() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        }

        // Cleanup function
        return () => {
            d3.select("body").selectAll(".tooltip").remove();
        };
    }, [data, width, height, color, showValues]);

    return (
        <div className="w-full h-full">
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className="w-full h-full"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMidYMid meet"
            />
        </div>
    );
}
