import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TicketDistributionChartProps {
    data: { month: string; barValue: number; lineValue: number }[];
    width?: number;
    height?: number;
}

export default function TicketDistributionChart({
    data,
    width = 500,
    height = 300
}: TicketDistributionChartProps) {
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
            .padding(0.3);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => Math.max(d.barValue, d.lineValue)) || 100])
            .range([chartHeight, 0])
            .nice();

        // Criar o grupo principal
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Adicionar grid horizontal PRIMEIRO (para ficar atrás)
        g.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(yScale)
                .tickSize(-chartWidth)
                .tickFormat(() => "")
            )
            .style("stroke", "#e5e7eb")
            .style("stroke-opacity", 0.08);

        // Adicionar as barras
        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.month) || 0)
            .attr("y", d => yScale(d.barValue))
            .attr("width", xScale.bandwidth())
            .attr("height", d => chartHeight - yScale(d.barValue))
            .attr("fill", "#8b5cf6")
            .attr("rx", 4)
            .attr("ry", 4)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", "#7c3aed");
                showTooltip(event, `Ticket: R$${d.barValue.toFixed(2)}`);
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill", "#8b5cf6");
                hideTooltip();
            });

        // Adicionar a linha
        const line = d3.line<{ month: string; lineValue: number }>()
            .x(d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
            .y(d => yScale(d.lineValue))
            .curve(d3.curveMonotoneX);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#14b8a6")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Adicionar pontos na linha
        g.selectAll(".line-point")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", "line-point")
            .attr("cx", d => (xScale(d.month) || 0) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.lineValue))
            .attr("r", 4)
            .attr("fill", "#14b8a6")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("r", 6);
                showTooltip(event, `Média: R$${d.lineValue.toFixed(2)}`);
            })
            .on("mouseout", function () {
                d3.select(this).attr("r", 4);
                hideTooltip();
            });

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

        // Adicionar legenda abaixo do gráfico
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${margin.left}, ${height - 30})`);
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
