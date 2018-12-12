import {DecathlonCanvas} from "../../workflow/components/DecathlonCanvas";
import {DecathlonComponent, IDecathlonComponentProps} from "../../workflow/components/DecathlonComponent";
import * as React from "react";
import {INode} from "../graphLayout/data/INode";
import {IEdge} from "../graphLayout/data/IEdge";
import {Point} from "../../base/Point";
import {LinkSheetDataUtil} from "../utils/LinkSheetDataUtil";
import {IComponentFactory} from "../../workflow/global/IComponentFactory";
import {StepContainer} from "./StepContainer";
import {ComponentFactory} from "../../workflow/global/ComponentFactory";
import {CommConst} from "../consts/CommConst";
import "./DecathlonLinkSheetVisualGraph.scss";


export class DecathlonLinkSheetVisualGraph extends DecathlonComponent {
    private _origin: Point;
    private _canvas: DecathlonCanvas<IDecathlonComponentProps>;
    private _stepRendererFactory: IComponentFactory;
    public selectedNode: INode;
    public selectedEdge: IEdge;

    constructor(props, context) {
        super(props, context);
        this.state = {
            stepsElement: [],
            nodesElement: [],
            edgesElement: [],
        };

        this._origin = new Point(0, 0);
    }

    componentWillMount() {
        console.log("初始化调用接口攞数据");
        // this.init();
    }

    componentDidMount() {
        this.init();
    }

    public init() {
        // 模拟数据
        let vStepDatas = [{"stepId": 1, "stepName": "step1", "width": 250, "x": 0, "height": 1080, "color": "#54A0FF"},
                            {"stepId": 2, "stepName": "step2",  "width": 250, "x": 251, "height": 1080, "color": "#0BD3FF"},
                            {"stepId": 3, "stepName": "step3", "width": 250, "x": 502, "height": 1080, "color": "#2ED5D6"},
                            {"stepId": 4, "stepName": "step4", "width": 250, "x": 753, "height": 1080, "color": "#36D1A1"},
                            {"stepId": 5, "stepName": "step5", "width": 250, "x": 1004, "height": 1080, "color": "#FBC958"}];
        let vNodeDatas = [{"id": "node1", "name": "Alice", "stepId": 1, "type": "BaseSheet"},
                    {"id": "node2", "name": "Kevin", "stepId": 1, "type": "BaseSheet"},
                    {"id": "node3", "name": "Jane", "stepId": 2, "type": "ETLSheet"},
                    {"id": "node4", "name": "Daniel", "stepId": 2, "type": "LinkModule"},
                    {"id": "node4", "name": "CiCi", "stepId": 3, "type": "ETLSheet"}];
        let vEdgeDatas = [{"id": "edge1", "sourceId": "node1", "targetId": "node2", "transfrom": []},
                            {"id": "edge2", "sourceId": "node2", "targetId": "node3", "transfrom": []},
                            {"id": "edge1", "sourceId": "node2", "targetId": "node4", "transfrom": []}];

        let stepedNodeData: Map<number, Array<object>> = LinkSheetDataUtil.layerNodesDataForStep(vNodeDatas);
        console.log(stepedNodeData.size);

        // this.setState({stepContainers: vStepDatas});
        this.initVGroup();
        this.initStep(vStepDatas);
    }

    protected initVGroup(): void {
        this._stepRendererFactory = new ComponentFactory(StepContainer);
    }

    protected initStep(stepDatas: Array<object>): void {
        let initStepDatas: Array<any> = [];
        // 初始化所有step实例用于后续加载
        for (let stepItemData of stepDatas) {
            let itemView: any = this._stepRendererFactory.newInstance();
            // let itemObj: object = {};
            // itemObj[CommConst.VIEW] = itemView;
            // itemObj[CommConst.PROPS] = stepItemData;
            let itemDict: Map<string, any> = new Map<string, any>();
            itemDict.set(CommConst.VIEW, itemView);
            itemDict.set(CommConst.PROPS, stepItemData);
            initStepDatas.push(itemDict);
        }

        this.setState({stepsElement: initStepDatas});
    }

    render() {
        return (
            <DecathlonCanvas id={"linkSheetCanvas"} getEntity={(canvasComp) => {this._canvas = canvasComp; }}>
                <button>hihi</button>
                {
                    this.state["stepsElement"].map((item, key) => {
                        const StepComponent = (item as Map<string, any>).get(CommConst.VIEW);
                        const stepProps = (item as Map<string, any>).get(CommConst.PROPS);
                        return < StepComponent key={key} {...stepProps}/>;
                    })
                }
            </DecathlonCanvas>
        );
    }
}