import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "components/Layout.tsx", [
        index("routes/dashboard.clientes.tsx"),
        route("clusters", "routes/clusters.tsx"),
        route("simular-leads", "routes/simular-leads.tsx"),
        route("dashboard", "routes/dashboard.tsx"),
        route("dashboard/clientes", "routes/dashboard.clientes.tsx"),
        route("dashboard/nps", "routes/dashboard.nps.tsx"),
        route("dashboard/tickets", "routes/dashboard.tickets.tsx"),
        route("dashboard/contratos", "routes/dashboard.contratos.tsx"),
    ]),
] satisfies RouteConfig;
