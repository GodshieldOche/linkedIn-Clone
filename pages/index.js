import Head from "next/head";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar";
import Feeds from "../components/Feeds";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../redux/features/modal";
import Modal from "../components/Modal";
import { getPosts } from "../redux/features/posts";
import { wrapper } from '../redux/store'
import Widgets from "../components/Widgets";


export default function Home({ articles }) {
  const { data: session } = useSession()
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  const dispatch = useDispatch()
  const { modalType, modalState } = useSelector(state => state.modal)

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>
      </Head>
      <Header />

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          {/* side bar */}
          <Sidebar/>
          {/* feed */}
          <Feeds/>
        </div>
        {/* widgets */}
        <Widgets articles={ articles }/>
        <AnimatePresence>
          {modalState && (
            <Modal handleClose={() => dispatch(setModalState(false))} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
  await store.dispatch(getPosts())

  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  // Get Google News API
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=ng&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      articles: results.articles,
      session,
    },
  };

})