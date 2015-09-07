/**
 * Copyright 2015, Marko Polovina
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = require('react/addons'),
ScaleBar = require('../ScaleBar.jsx'),
expect = require('expect');

describe('This test for ScaleBar', () => {
    afterEach((done) => {
        React.unmountComponentAtNode(document.body);
        document.body.innerHTML = '';
        setTimeout(done);
    });

    // test DEFAULTS
    it('creates the component with defaults', () => {
        const scalebar = React.render(<ScaleBar/>, document.body);
        expect(scalebar).toExist();

        const scalebarDom = React.findDOMNode(scalebar);
        expect(scalebarDom).toExist();

        expect(scalebarDom.className).toExist();
        expect(scalebarDom.className).toBe("mapstore-scalebox-bar-main");
        expect(scalebarDom.id).toNotExist();

        const scalebarDist = scalebarDom.getElementsByClassName('mapstore-scalebox-bar-dist');
        expect(scalebarDist).toExist();

        const scalebarDistSpan = scalebarDist.getElementsByTagName('span');
        expect(scalebarDistSpan).toExist();
        expect(scalebarDistSpan.length).toBe(1);
    });

    it('checks if a zoom in on map changes scalebar value', () => {
        const scalebar = React.render(<ScaleBar/>, document.body);
        const scalebarDom = React.findDOMNode(scalebar);
        const scalebarDist = scalebarDom.getElementsByClassName('mapstore-scalebox-bar-dist');
        
        const firstDist = scalebarDist.style.width;
        
        if (leafMap.getMaxZoom() !== leafMap.getZoom())
            leafMap.zoomIn();
        else
            leafMap.zoomOut();

        const secondDist = scalebarDist.style.width;
        expect(firstDist).not.toBe(secondDist);
    });

    // test CUSTOM
    it('checks the custom scalebar text and width', () => {
        var scaleboxVar = {
            getBarValues: function () {
                var def = new $.Deferred();
                setTimeout(function () {
                    def.resolve(['1:5000', 150]);
                }, 1000);
                return def.promise();
            }
        };

        const scalebar = React.render(<ScaleBar scalebox={scaleboxVar}/>, document.body);
        const scalebarDom = React.findDOMNode(scalebar);
        const scalebarDist = scalebarDom.getElementsByClassName('mapstore-scalebox-bar-dist');
        const scalebarDistSpan = scalebarDist.getElementsByTagName('span');

        expect(scalebarDist.style.width).toBe(150);
        expect(scalebarDistSpan.innerHTML).toBe("1:5000");
    });
});
