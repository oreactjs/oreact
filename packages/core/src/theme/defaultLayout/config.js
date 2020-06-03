import Layout from './Layout';

export default {
    title: 'Default Layout',
    component: Layout,
    defaults: {
        style: 'fullwidth',
        scroll: 'content',
        navbar: {
            display: false,
        },
        toolbar: {
            display: true,
        },
        footer: {
            display: false,
        },
        leftSidePanel: {
            display: false,
        },
        rightSidePanel: {
            display: false,
        }
    }
};

