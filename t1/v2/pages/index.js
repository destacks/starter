import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
          veritatis!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
          dignissimos consequuntur? Delectus nesciunt enim error temporibus
          consequuntur facere voluptatum cupiditate dolores? Consequuntur
          molestiae accusamus facere ducimus provident, quaerat voluptate
          debitis.
        </p>
        <p>
          Go to my first{" "}
          <Link href="/posts/first-post">
            <a>blog post</a>
          </Link>
          !
        </p>
      </section>
    </Layout>
  );
}
