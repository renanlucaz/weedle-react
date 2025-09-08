import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "components/Layout.tsx", [
        index("routes/dashboard.tsx"),
        route("clusters", "routes/clusters.tsx"),
        route("simular-leads", "routes/simular-leads.tsx"),
        route("dashboard/clientes", "routes/dashboard.clientes.tsx"),
        route("dashboard/nps", "routes/dashboard.nps.tsx"),
        route("dashboard/contratos", "routes/dashboard.contratos.tsx"),
    ]),
] satisfies RouteConfig;
