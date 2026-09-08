import Script from 'next/script'

// Microsoft Advertising UET tag (ID 97267849). Loads bat.js and fires pageLoad.
// Purchase events are pushed from app/success/page.tsx via window.uetq.
export default function Uet() {
  return (
    <Script id="uet" strategy="beforeInteractive">
      {`(function(w,d,t,u,o){w[u]=w[u]||[],o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.com/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:""),n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)})(window,document,"script","uetq",{ti:"97267849",enableAutoSpaTracking:true});`}
    </Script>
  )
}
