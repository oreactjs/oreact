import React, {Children} from 'react';
import PropTypes from 'prop-types';
import _ from '../lodash';
import ifElse from './utils/ifElse';
import RuntimeConfig from './RuntimeConfig';
import StoreState from './StoreState';
import HTML from 'app/HTML';

// PRIVATES
function KeyedComponent({children}) {
    return Children.only(children);
}

const stylesheetTag = (stylesheetFilePath) => {
    return (
        <link href={stylesheetFilePath} media="screen, projection" rel="stylesheet" type="text/css"/>
    );
};

const scriptTag = (jsFilePath) => {
    return <script type="text/javascript" src={jsFilePath}/>;
};

// COMPONENT
function ServerHTML(props) {
    const {apolloState, locals, nonce, reactAppString} = props;
    const {headerContext:{helmet}, styleSheets, stores, extractor} = locals.pageProperties;

    // Creates an inline script definition that is protected by the nonce.
    const inlineScript = body =>
        <script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{__html: body}}/>;

    const inlineStyle = body =>
        <style nonce={nonce} rel="stylesheet" type="text/css" dangerouslySetInnerHTML={{__html: body}}/>;

    const JssStyleTag = body =>
        <style nonce={nonce} id="jss-server-side" rel="stylesheet" type="text/css"
               dangerouslySetInnerHTML={{__html: body}}/>;

    const headerElements = _.compact([
        ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
        ...ifElse(helmet)(() => helmet.title.toComponent(), []),
        ...ifElse(helmet)(() => helmet.base.toComponent(), []),
        ...ifElse(helmet)(() => helmet.link.toComponent(), []),
        stylesheetTag(`${process.env.PUBLIC_PATH}assets/fonts/material-outline-icons/styles.css`),
        stylesheetTag(`${process.env.PUBLIC_PATH}assets/fonts/meteocons/style.css`),
        JssStyleTag(styleSheets.toString()),
        <RuntimeConfig nonce={nonce}/>,
        <StoreState nonce={nonce} stores={stores}/>,
        ...ifElse(helmet)(() => helmet.style.toComponent(), []),
        //...extractor.getLinkElements(),
        ...ifElse(helmet)(() => helmet.script.toComponent(), []),
        ...extractor.getScriptElements()
    ]);

    const bodyElements = _.compact([
        ...extractor.getStyleElements(),
        // Bind our async components state so the client knows which ones
        // to initialise so that the checksum matches the server response.
        // @see https://github.com/ctrlplusb/react-async-component
        ifElse(apolloState)(() =>
            inlineScript(
                `window.__SERVER_STATE__=${JSON.stringify(apolloState)};`,
            ),
        ),
        // Enable the polyfill io script?
        // This can't be configured within a react-helmet component as we
        // may need the polyfill's before our client JS gets parsed.
        /*ifElse(config('polyfillIO.enabled'))(() =>
            scriptTag(`${config('polyfillIO.url')}?features=${config('polyfillIO.features').join(',')}`),
        ),*/
        // When we are in development mode our development server will
        // generate a vendor DLL in order to dramatically reduce our
        // compilation times.  Therefore we need to inject the path to the
        // vendor dll bundle below.
        /*ifElse(
            process.env.BUILD_FLAG_IS_DEV === 'true' && config('bundles.client.devVendorDLL.enabled'),
        )(() =>
            scriptTag(
                `${config('bundles.client.webPath')}${config(
                    'bundles.client.devVendorDLL.name',
                )}.js?t=${Date.now()}`,
            ),
        ),*/
    ]);

    return (
        <HTML
            htmlAttributes={ifElse(helmet)(() => helmet.htmlAttributes.toComponent(), null)}
            bodyAttributes={ifElse(helmet)(() => helmet.bodyAttributes.toComponent(), null)}
            headerElements={headerElements.map((x, idx) =>
                (<KeyedComponent key={idx}>
                    {x}
                </KeyedComponent>),
            )}
            bodyElements={bodyElements.map((x, idx) =>
                (<KeyedComponent key={idx}>
                    {x}
                </KeyedComponent>),
            )}
            appBodyString={reactAppString}
        />
    );
}

ServerHTML.propTypes = {
    apolloState: PropTypes.object,
    locals: PropTypes.object,
    nonce: PropTypes.string,
    reactAppString: PropTypes.string,
};

// EXPORT
export default ServerHTML;
