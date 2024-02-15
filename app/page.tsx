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
  address: "0x3904Aca8413b48Af2D1A741D913a7591fB0240EB",
  chain: baseSepolia,
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
      frames.js starter kit. The Template Frame is on this page, it&apos;s in
      the html meta tags (inspect source).{" "}
      <Link href={`/debug?url=${baseUrl}`} className="underline">
        Debug
      </Link>
      <FrameContainer
        postUrl="/frames"
        pathname="/"
        state={state}
        previousFrame={previousFrame}
      >
        {!state.gotTicket ? 
          <FrameImage
          src="https://ipfs.decentralized-content.com/ipfs/bafybeifs7vasy5zbmnpixt7tb6efi35kcrmpoz53d3vg5pwjz52q7fl6pq/cook.png"
          aspectRatio="1:1"
          ></FrameImage> : 
          <FrameImage>
            <div tw="w-full h-full bg-black text-white justify-center items-center">
              You&apos;re going to Coachella!
            </div>
          </FrameImage>
        }
        {!state.gotTicket ? <FrameButton action="mint" target={tokenUrl}>Get Ticket</FrameButton> : null}
      </FrameContainer>
    </div>
  );
}
