import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Info from '../components/Info'
import Pages from '../components/Pages'
import Footer from '../components/Footer'

import { IDoujinInfo } from 'nhentai-pdf/dist/lib/Doujin';

const User = (props: any) => {
  const router = useRouter()
  const { code } = router.query
  const [data, setData] = useState<IDoujinInfo>()
  const [error, setError] = useState({ active: false, type: 200 });

  const getData = () => {
    fetch(`/api/doujin?code=${code}`)
      .then(async response => {
        const data = await response.json()
        if (data === false) return setError({ active: true, type: 404 });
        return data
      })
      .then(json => setData(json))
      .catch(error => {
        setError({ active: true, type: 400 });
        console.error('Error:', error);
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <main>

      {error && error.active ? (
        <h1>No Doujin Found</h1>
      ) : (
        <>
          <Head>
            <title>{data?.title || 'NH'}</title>
            <meta name="referrer" content="no-referrer" />
          </Head>
          {data && <Info data={data} />}

          {data && <Pages pages={data.pages}/>}
          <Footer />
        </>
      )}
    </main>
  );
};

export default User;