import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Top10BarChartProps {
    data: { label: string; value: number; fullLabel?: string }[];
    width?: number;
    height?: number;
    color?: string;
    showValues?: boolean;
    fontSize?: number;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

export default function Top10BarChart({
    data,
    width = 500,
    height = 300,
    color = "#8b5cf6",
    showValues = true,
    fontSize = 12,
    margin = { top: 5, right: 40, bottom: 200, left: 60 }
}: Top10BarChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;

        // Limpar o SVG anterior
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current);
        const chartWidth = width - (margin.left || 0) - (margin.right || 0);
        const chartHeight = height - (margin.top || 0) - (margin.bottom || 0);

        // Escalas
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, chartWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value) || 100])
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
                .ticks(4)
            )
            .selectAll("line")
            .style("stroke", "#9ca3af")
            .style("stroke-opacity", 0.3)
            .style("stroke-width", 1)
            .selectAll(".domain")
            .style("stroke", "none");

        // Cor única roxa para todas as barras
        const barColor = color || "#8b5cf6";

        // Adicionar as barras verticais
        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d.label) || 0)
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => chartHeight - yScale(d.value))
            .attr("fill", barColor)
            .attr("rx", 4)
            .attr("ry", 4)
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", d3.color(barColor)?.brighter(0.2)?.toString() || barColor);
                showTooltip(event, `${d.label}: ${d.value.toLocaleString()}`);
            })
            .on("mouseout", function (event, d) {
                d3.select(this).attr("fill", barColor);
                hideTooltip();
            });

        // Adicionar valores nas barras (se habilitado)
        if (showValues) {
            g.selectAll(".bar-label")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "bar-label")
                .attr("x", d => (xScale(d.label) || 0) + xScale.bandwidth() / 2)
                .attr("y", d => yScale(d.value) - 5)
                .attr("text-anchor", "middle")
                .style("font-size", `${fontSize}px`)
                .style("fill", "#6b7280")
        }

        // Adicionar eixo X (labels das barras)
        g.append("g")
            .attr("transform", `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .selectAll("text")
            .style("font-size", `${fontSize}px`)
            .style("fill", "#6b7280")
            .style("text-anchor", "end")
            .attr("dx", "-0.5em")
            .attr("dy", "0.5em")
            .attr("transform", "rotate(-45)")
            .style("cursor", "pointer")
            .text(function (d: any) {
                const text = d.toString();
                return text.length > 15 ? text.substring(0, 15) + "..." : text;
            })
            .on("mouseover", function (event: any, d: any) {
                const dataItem = data.find(item => item.label === d);
                const tooltipText = dataItem?.fullLabel || d;
                showTooltip(event, tooltipText);
            })
            .on("mouseout", function () {
                hideTooltip();
            });

        // Adicionar eixo Y (valores)
        g.append("g")
            .call(d3.axisLeft(yScale).ticks(4).tickSize(0))
            .selectAll("text")
            .style("font-size", `${fontSize}px`)
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
            .style("font-size", `${fontSize}px`)
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
    }, [data, width, height, color, showValues, fontSize, margin]);

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
