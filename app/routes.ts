import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("/", "components/Layout.tsx", [
        index("routes/dashboard.tsx"),
        route("clusters", "routes/clusters.tsx"),
        route("simular-leads", "routes/simular-leads.tsx"),
    ]),
] satisfies RouteConfig;
