import type { MetaFunction } from "@remix-run/cloudflare";
import { Hero } from "./features/Hero/Hero";
import { About } from "./features/About/About";
import { Profile } from "./features/Profile/Profile";
import { Products } from "./features/Products/Products";
import { Skill } from "./features/Skill/Skill";
import { Blog } from "./features/Blog/Blog";
import { Layout } from "./features/Layout/Layout";
import { Link } from "@remix-run/react";
import { Header } from "~/component/Header/Header";
import { Footer } from "~/component/Footer/Footer";

export const meta: MetaFunction = () => {
    return [
        { title: "KoshiのPortfolio" },
        { name: "description", content: "エンジニアKoshiのポートフォリオサイトです。" },
    ];
};

export default function Index() {
    return (
        <Layout>
            <Header />
            <Hero />
            <About />
            <Profile />
            <Products />
            <Skill />
            <Blog />
            <Footer/>
        </Layout>
    );
}