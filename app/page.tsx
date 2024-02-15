import { getTokenUrl } from "frames.js";
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameReducer,
  NextServerPageProps,
  getPreviousFrame,
  useFramesReducer,
} from "frames.js/next/server";
import Link from "next/link";
import { baseSepolia } from "viem/chains";

type State = {
  gotTicket: boolean;
};

const tokenUrl: string = getTokenUrl({
  address: "0x1c0Ff199cbaB8Fd990b534057E853e32a77646B4",
  chain: baseSepolia,
  tokenId: "5"
})

const initialState: State = { 
  gotTicket: false
 };

const reducer: FrameReducer<State> = (state, action) => {
  return {
    gotTicket: true,
  };
};

// This is a react server component only
export default async function Home({
  params,
  searchParams,
}: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const [state, dispatch] = useFramesReducer<State>(reducer, initialState, previousFrame);

  const baseUrl = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

  // then, when done, return next frame
  return (
    <div>
      {/* <Link href={`/debug?url=${baseUrl}`} className="underline">
        Debug
      </Link> */}
      <FrameContainer
        postUrl="/frames"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {!state.gotTicket ? 
          <FrameImage
          src="https://ipfs.decentralized-content.com/ipfs/QmV2HwXdkd4XjnQmdkTiZ2rgNhsui9ieTKZ5AeUZuJrYct"
          aspectRatio="1:1"
          ></FrameImage> : 
          <FrameImage
          src="https://ipfs.decentralized-content.com/ipfs/QmaFou7CzS42ToV32EqJ7vVnUrZpyckNRbaDg3HSg2VHKu"
          aspectRatio="1:1"
          ></FrameImage>
        }
        {!state.gotTicket ? <FrameButton action="mint" target={tokenUrl}>Get Ticket</FrameButton> : null}
      </FrameContainer>
    </div>
  );
}
