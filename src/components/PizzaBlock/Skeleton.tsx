import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
    className={'pizza-block'}
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="493" y="477" rx="3" ry="3" width="88" height="6" />
    <rect x="493" y="495" rx="3" ry="3" width="52" height="6" />
    <rect x="445" y="525" rx="3" ry="3" width="410" height="6" />
    <rect x="445" y="541" rx="3" ry="3" width="380" height="6" />
    <rect x="445" y="557" rx="3" ry="3" width="178" height="6" />
    <circle cx="579" cy="526" r="20" />
    <circle cx="594" cy="528" r="54" />
    <circle cx="131" cy="143" r="115" />
    <rect x="0" y="265" rx="0" ry="0" width="280" height="20" />
    <rect x="-1" y="308" rx="10" ry="10" width="280" height="80" />
    <rect x="4" y="408" rx="10" ry="10" width="90" height="30" />
    <rect x="123" y="407" rx="10" ry="10" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton