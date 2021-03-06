import * as React from "react";
import {DecathlonComponent} from "../workflow/components/DecathlonComponent";
import {PersonEvent} from "../events/PersonEvent";

export default class TestEventComponent extends DecathlonComponent {
    private _name: string;
    constructor(props, context) {
        super(props, context);
        if (props["name"]) {
            this._name = props["name"];
        }
    }

    public set name(value: string) {
        this._name = value;
    }

    todoTestDispatch = () => {
        this.entityAddEventListener(PersonEvent.TEST_EVENT, this.onTestEventHandler, this);
        this.entityDispatchEvent(new PersonEvent(PersonEvent.TEST_EVENT, "hahaha"));
    }

    onTestEventHandler = (event: PersonEvent) => {
        console.log(`onTestEventHandler`, event.data);
    }

    componentDidMount() {
        // this.todoTestDispatch();
        this.entityDispatchEvent(new PersonEvent(PersonEvent.TEST_EVENT, "hahaha"));
        console.log("dispatch");
    }

    parentCall = () => {
        console.log("父节点call");
    }

    public printData = () => {
        console.log(this.data);
        console.log(this._name);
    }

    render() {
        return(
            <div>
                <h1>Test Event</h1>
                <button onClick={this.todoTestDispatch}>hihi</button>
            </div>
        );
    }
}