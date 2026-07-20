import { matchPath, Outlet, useLocation } from "react-router-dom";
import BottomBar from "../components/common/BottomBar";

const Layout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isSplash = !!matchPath("/splash", location.pathname);
  const isLogin = !!matchPath("/login", location.pathname);

  const isSignup = !!matchPath(
    { path: "/signup/*", end: false },
    location.pathname,
  );

  const isGuide = !!matchPath("/guide", location.pathname);

  const isCertification = !!matchPath("/certification", location.pathname);
  const isCertificationGuide = !!matchPath(
    "/certification/guide",
    location.pathname,
  );
  const isCertificationShoot = !!matchPath(
    "/certification/shooting",
    location.pathname,
  );
  const isCertificationSuccess = !!matchPath(
    "/certification/success",
    location.pathname,
  );
  const isCertificationFail = !!matchPath(
    "/certification/fail",
    location.pathname,
  );

  const isDisposalInfo = !!matchPath("/disposal-info", location.pathname);
  const isDisposalInfoDetail = !!matchPath(
    "/disposal-info/detail",
    location.pathname,
  );
  const isDisposalInfoFail = !!matchPath(
    "/disposal-info/fail",
    location.pathname,
  );
  const isImageSearch = !!matchPath(
    "/disposal-info/image-search",
    location.pathname,
  );
  const isProblemSearch = !!matchPath(
    "/disposal-info/problem-search",
    location.pathname,
  );

  const isMyContribution = !!matchPath("/my-contribution", location.pathname);
  const isAllContribution = !!matchPath("/all-contribution", location.pathname);

  const isCamera = !!matchPath("/camera", location.pathname);
  const isReward = !!matchPath(
    { path: "/reward/*", end: false },
    location.pathname,
  );
  const isRewardAddressComplete = !!matchPath(
    "/reward/address-complete/:productId",
    location.pathname,
  );
  const isRewardUseComplete = !!matchPath(
    "/reward/use-complete/:productId",
    location.pathname,
  );
  const isCommunityDetail = !!matchPath(
    "/community/:postId",
    location.pathname,
  );

  const isMy = !!matchPath(
  { path: '/my/*', end: false },
  location.pathname,
  );

  const isMyProfileEdit = !!matchPath(
  '/my/profile',
  location.pathname,
  );

  const isMyPosts = !!matchPath(
  "/my/posts",
  location.pathname,
  );

  const isMycomments = !!matchPath(
  "/my/comments",
  location.pathname,
  );

  const hideTopBar =
    isHome ||
    isSplash ||
    isLogin ||
    isSignup ||
    isCamera ||
    isMy ||
    isRewardAddressComplete ||
    isRewardUseComplete;

  const hideBottomBar =
    isSplash ||
    isLogin ||
    isSignup ||
    isCertification ||
    isCertificationGuide ||
    isCertificationShoot ||
    isCertificationSuccess ||
    isCertificationFail ||
    isImageSearch ||
    isProblemSearch ||
    isMyContribution ||
    isAllContribution ||
    isDisposalInfoFail ||
    isDisposalInfoDetail ||
    isCamera ||
    isDisposalInfo ||
    isReward ||
    isCommunityDetail ||
    isMyPosts ||
    isMycomments ||
    isMyProfileEdit;

  const hasGreenBackground =
    isGuide ||
    isCertification ||
    isCertificationGuide ||
    isCertificationShoot ||
    isCertificationSuccess ||
    isDisposalInfo ||
    isDisposalInfoDetail ||
    isImageSearch ||
    isProblemSearch ||
    isDisposalInfoFail ||
    isCamera ||
    isAllContribution ||
    isReward ||
    isMyPosts ||
    isMycomments ||
    isMyProfileEdit;

  return (
    <div
      className={`min-h-screen overflow-auto ${
        hasGreenBackground ? "bg-bg-green1" : "bg-white"
      }`}
    >
      <div className="mx-auto min-h-screen w-full max-w-120">
        <div
          className={`mx-auto flex w-full max-w-120 flex-col ${
            hideTopBar ? "min-h-dvh" : "h-[calc(100dvh-56px)] pt-14"
          }`}
        >
          <main className="flex flex-1 flex-col">
            <Outlet />
          </main>

          {!hideBottomBar && <BottomBar />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
