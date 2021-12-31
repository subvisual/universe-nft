/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import GridView from './GridView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=61c33c9858a987caf6602ade").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
  { loading: Promise.resolve("const html=document.querySelector(\"html\"),madeBy=document.createComment(\"MADE BY ONDASTUDIO.CO\");document.insertBefore(madeBy,html),window.onpagehide=()=>{window.scrollTo(0,0)};const links=document.querySelectorAll(\".transition\");links.forEach(o=>{o.addEventListener(\"click\",e=>{e.preventDefault();const t=o.getAttribute(\"href\");setTimeout(()=>{window.location=t},500)})});const body=document.body;function letBodyScroll(e){body.style.overflow=e?\"hidden\":\"auto\"}const targetNode=document.querySelector(\".w-nav-button\"),config={attributes:!0,childList:!1,subtree:!1},callback=function(t,e){for(let e=0;e<t.length;e++)\"attributes\"===t[e].type&&letBodyScroll(t[e].target.classList.contains(\"w--open\"))},observer=new MutationObserver(callback);observer.observe(targetNode,config);var Webflow=Webflow||[];Webflow.push(function(){$(\".tab-wrapper\").on(\"click\",\".tab-prev, .tab-next\",function(){var e=$(this).hasClass(\"tab-prev\")?-1:1,t=$(this).parent().find(\".w-tab-menu\"),e=(e=t.find(\".w--current\").index()+e)>=t.children().length?0:e;t.find(\".w-tab-link\").eq(e).trigger(\"click\")})});"), isAsync: false },
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '61c33c9858a987cfe6602adf'
    htmlEl.dataset['wfSite'] = '61c33c9858a987caf6602ade'

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }

  render() {
    const proxies = IndexView.Controller !== IndexView ? transformProxies(this.props.children) : {
      'af-metamask-connect-btn': [],
      'af-metamask-connect-success': [],
      'af-mint-btn': [],
      'af-mint-success': [],
      'af-refresh-btn': [],
      'wallet-connect-btn': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/subvisual-holidays.webflow.css);


          * {
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -moz-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              -moz-font-feature-settings: \"smcp=1, onum=1, frac=1, kern=1, liga=1, dlig=1, swsh=1\";
              -ms-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              -o-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              -webkit-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              font-feature-settings: normal;
            }
          .navbar-background{
          	backdrop-filter: blur(20px);
          }
          .load-background {
          animation: colorBackgroundMove 1.5s cubic-bezier(0.22, 1, 0.36, 1);
          animation-delay: 0.8s;
          animation-fill-mode: forwards;
          } 
          @keyframes colorBackgroundMove {
          	0% {
          		width: 100vw;
          		height: 100vh;
          		margin-left: 0px auto;
                	border-radius: 0 0 0 0;
          	}
          	100% {
          		width: 97vw;
                	height: 97vh;
          		margin: 0px 1.5%;
                	border-radius: 0 0 60px 60px;
          	}
            }
          .w-webflow-badge{
          	display: none !important;
          }
        ` }} />
        <span className="af-view">
          <div>
            <div style={{display: 'flex', opacity: 1}} className="af-class-load-background">
              <h2 style={{opacity: 0}} className="af-class-load-heading">Probably the best gift you will get this year</h2>
            </div>
            <div className="af-class-overlays">
              <div className="af-class-overlay af-class-services" />
              <div className="af-class-overlay af-class-ventures" />
              <div className="af-class-overlay af-class-people" />
              <div className="af-class-overlay af-class-home" />
            </div>
            <div data-animation="over-right" className="af-class-navbar-2 af-class-nav-bar w-nav" data-easing2="ease-out-quint" data-easing="ease-out-quint" data-collapse="medium" data-w-id="22c507d2-81aa-fb41-e277-2746202e7921" role="banner" data-no-scroll={1} data-duration={700} id="navbar" data-doc-height={1}>
              <div id="navbar-background" data-w-id="c471534b-f3a3-dbd4-ad6e-0d5632ddbe71" className="af-class-navbar-background" />
              <div className="af-class-container af-class-nav-bar">
                <a href="index.html" aria-current="page" className="af-class-nav-brand af-class-transition af-class-t-home w-nav-brand w--current">
                  <div className="af-class-logo-box af-class-nav-bar"><img src="images/logo-white.svg" loading="lazy" data-w-id="22c507d2-81aa-fb41-e277-2746202e7925" alt="home link - subvisual logo" className="af-class-main-logo af-class-white-logo" /><img src="images/symbol-dark.svg" loading="lazy" data-w-id="368d4ba8-be94-e03f-58b9-5c2ff86a2ac7" alt="home link - subvisual logo" className="af-class-main-logo af-class-dim-grey-logo" /><img src="images/symbol-white.svg" loading="lazy" alt="home link - subvisual logo" className="af-class-main-logo af-class-white-symbol" /></div>
                </a>
              </div>
              <div className="af-class-overlay af-class-services" />
              <div className="af-class-overlay af-class-ventures" />
              <div className="af-class-overlay af-class-people" />
              <div className="af-class-overlay af-class-home" />
            </div>
            <div data-w-id="5b791318-b617-e57f-9221-88db8217b68e" className="af-class-section af-class-hero af-class-wf-section">
              <div className="af-class-video-container af-class-edge"><img src="images/background.png" loading="lazy" sizes="(max-width: 991px) 100vw, 97vw" height={452} srcSet="images/background-p-500.png 500w, images/background-p-800.png 800w, images/background-p-1080.png 1080w, images/background.png 2000w" alt className="af-class-hero-image af-class-edge" /></div>
              <div className="af-class-first-container af-class-hero">
                <div className="af-class-hero-container">
                  <h1 data-w-id="56db997e-04bc-2ac5-cb21-fbbf060aa002">Our universe without u, is kinda niverse 😟</h1>
                </div>
              </div>
              <div className="af-class-second-container af-class-hero">
                <div className="af-class-hero-container af-class-stop-phone"><img src="images/Subvisual_arrow.svg" loading="lazy" style={{opacity: 0}} alt className="af-class-hero-arrow" />
                  <div style={{WebkitTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0}} className="af-class-margin-left-40 af-class-switch-top-phone">
                    <p className="af-class-color-white">There's more if you scroll a little.</p>
                  </div>
                </div>
              </div>
            </div>
            <div data-w-id="203a3fe2-dd47-8144-357c-8264319fc900" className="af-class-section af-class-wf-section">
              <div className="af-class-container">
                <h2 data-w-id="e1152758-d9c0-c7ba-339a-5ef2086dd60c" className="af-class-reveal">Let's mark your presence in the universe, <span className="af-class-alternative">with blockchain</span>.</h2>
              </div>
              <div className="af-class-container">
                <div className="af-class-margin-top-40">
                  <div className="af-class-background-alice-blue af-class-hide">
                    <div className="af-class-align-center">
                      <h5>Coming soon, feel the FOMO 🔥</h5>
                    </div>
                  </div>
                  <div className="af-class-align-center">
                    {map(proxies['af-metamask-connect-btn'], props => <a href="#" {...{...props, className: `af-class-button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Connect Metamask</React.Fragment>}</a>)}
                    {map(proxies['af-metamask-connect-success'], props => <h5 {...props}>{props.children ? props.children : <React.Fragment>✅ Metamask connected</React.Fragment>}</h5>)}
                  </div>
                  <div className="af-class-margin-top-40">
                    <div className="af-class-align-center">
                      {map(proxies['af-mint-btn'], props => <a href="#" {...{...props, className: `af-class-button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>MINT! 🚀</React.Fragment>}</a>)}
                      {map(proxies['af-mint-success'], props => <h5 {...props}>{props.children ? props.children : <React.Fragment>✅ Minted</React.Fragment>}</h5>)}
                    </div>
                  </div>
                  <div className="af-class-margin-top-40">
                    <div className="af-class-align-center">
                      {map(proxies['af-refresh-btn'], props => <a href="#" {...{...props, className: `af-class-button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>PLEASE REFRESH THE PAGE</React.Fragment>}</a>)}
                    </div>
                  </div>
                  <div className="af-class-margin-top-40">
                    <div className="af-class-align-center">
                      <h2>⬇️</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="af-class-section-2 af-class-hide af-class-wf-section">
              {map(proxies['wallet-connect-btn'], props => <a href="#" {...{...props, className: `af-class-button-2 w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Connect Metamask</React.Fragment>}</a>)}
            </div>
            <div data-w-id="af83e6be-7ee1-7e00-8f28-f94b864a679b" className="af-class-section af-class-no-padding-down af-class-wf-section">
              <div className="af-class-container">
                <h2 className="af-class-reveal">What you did up there ⬆️, is showing up down here ⬇️<span className="af-class-alternative" /></h2>
                <div className="af-class-margin-top-40">
                  <p className="af-class-reveal af-class-max-width-442">Where could it be? 🤓<br /></p>
                </div>
              </div>
              <div className="af-class-container af-class-nfts af-class-hide">
                <div className="af-class-margin-top-40">
                  <div className="af-class-img-holder"><img src="images/background-tiles.png" loading="lazy" srcSet="images/background-tiles-p-500.png 500w, images/background-tiles.png 1501w" sizes="100vw" alt="A beautiful background made of tiles" className="af-class-img" /></div>
                </div>
              </div>
            </div>
            <GridView.Controller />
            <div className="af-class-section af-class-footer af-class-wf-section">
              <div className="af-class-container">
                <div className="af-class-columns-grid-2">
                  <div className="af-class-column-1" />
                  <div className="af-class-column-2">
                    <h1 className="af-class-alternative">Happy Holidays 💙</h1>
                  </div>
                </div>
                <div className="af-class-margin-top-84">
                  <div className="af-class-columns-grid-2">
                    <div className="af-class-column-1">
                      <h5 className="af-class-color-royal-blue">The footer</h5>
                      <div className="af-class-margin-top-20">
                        <p>It's where the website ends. Yap.</p>
                      </div>
                    </div>
                    <div className="af-class-column-2" />
                  </div>
                </div>
              </div>
            </div>
            <div data-w-id="7a41a91f-44b1-a3d3-4655-747c7af1861b" className="af-class-reveal" />
            <div className="af-class-reveal-no-move" />
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */