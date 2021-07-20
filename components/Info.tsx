import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import UserInfoStyles from './styles/MainStyles';
import { Section } from '../styles'
import type { IDoujinInfo } from 'nhentai-pdf/dist/lib/Doujin';

const UserInfo: React.FC<{ data: IDoujinInfo }> = ({ data }) => {
  const code = data.link.split('/').reduce((prev, index, _c, arr) => arr[arr.length -1 ], '')
  const image = data.pages[0].replace('i.', 't.').replace('1.jpg', 'cover.jpg').replace('1.png', 'cover.png')
  console.log(image)
  return (
  <Section dark>
    {data && (
      <UserInfoStyles>
        {data.pages[0] && (
          <div className="coverimage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="cover" />
  
          </div>
        )}

        {data.title && <h1>{data.title}</h1>}

        {data.link && (
          <>
          <h2>
            <Link href={`/api/doujin?method=download&code=${code}`}>
            <a>
              Download
            </a>
            </Link>
          </h2>
          </>
        )}

        <div className="info">
          {data.details.categories && (
            <span className="info__item">
              Categories:{' '}
              {(data.details.categories.join(', '))}
            </span>
          )}
        </div>

        <div className="stats">
          <div className="stats__item">
            <span className="num">{data.details.pages}</span>
            <span className="num-label">Pages</span>
          </div>
          <div className="stats__item">
            <span className="num">{data.details.artists[0]}</span>
            <span className="num-label">Artist</span>
          </div>
          <div className="stats__item">
            <span className="num">{code}</span>
            <span className="num-label">Code</span>
          </div>
        </div>
      </UserInfoStyles>
    )}
  </Section>
)
        }
export default UserInfo;
