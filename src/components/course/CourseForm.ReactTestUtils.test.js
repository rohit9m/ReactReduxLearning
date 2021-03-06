import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) { // helpful to return the output of rending the component under test
    let props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props} />);
    let output = renderer.getRenderOutput(); // to get the output of the component

    return { // get an object back that contains the props that we set, output and renderer
        props,
        output,
        renderer
    };
}

describe('CourseForm via React Test Utils', () => {
    it('renders form and h1', () => { //naming the test
        const { output } = setup(); //output of the render of the CourseForm
        expect(output.type).toBe('form'); //the output of the top level element that we will revceive
        let [ h1 ] = output.props.children;
        expect(h1.type).toBe('h1'); //make sure that the first element within the parent element is a h1
    });

    it("save button is labeled 'Save' when not saving", () => {
        const { output } = setup(false);
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Save');
    });
    it("save button is labeled 'Saving...' when saving", () => {
        const { output } = setup(true);
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Saving...');
    });
});