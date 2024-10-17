import React, { useEffect, useState } from "react";
import "./scrollIndicator.css";
const ScrollIndicator = ({ url }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);
  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const res = await fetch(getUrl);
      const data = await res.json();
      if (data && data.products && data.products.length > 0) {
        setdata(data.products);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(e.message);
    }
  }
  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollWidth
    );
    const howMuchScrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setScrollPercentage((howMuchScrolled / height) * 100);
    console.log(
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    );
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  if (errorMsg) {
    return <div>Error! {errorMsg}</div>;
  }
  if (loading) {
    return <div>Loading ! Please wait..</div>;
  }

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll indicator</h1>
        <div className="scroll-progress-container">
          <div
            className="current-progressbar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((dataItem) => <p key={dataItem.id}>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
};

export default ScrollIndicator;
