import BimatterViewer from "./src/Viewer/BimatterViewer";
// import * as THREE from "three";
const viewer = new BimatterViewer();
viewer.utils.useStats = true;
document.addEventListener("DOMContentLoaded", () => {
    viewer.utils.propsUtils.initPropConteiner(document.getElementById("props"));
    window.addEventListener("keydown", onKeyDown);
    const input = document.getElementById("file-input");
    const demoIfc = document.getElementById("demo-ifc");
    const demoBmt = document.getElementById("demo-bmt");
    const exportBmt = document.getElementById("export-bmt");

    const greenBtn = document.getElementById("green");
    const redBtn = document.getElementById("red");
    const blueBtn = document.getElementById("blue");
    const infoBut = document.getElementById("infoBut");
    const info = document.getElementById("info");
    infoBut.addEventListener("mouseenter", () => {
        info.style.display = "block";
    });
    infoBut.addEventListener("mouseleave", () => {
        info.style.display = "none";
    });

    greenBtn.addEventListener("click", () => {
        viewer.utils.geometryUtils.createGeometryChunk({
            modelID: 0,
            ids: Array.from(viewer.selector.selectedElements[0]),
            color: "green",
        });
    });
    redBtn.addEventListener("click", () => {
        viewer.utils.geometryUtils.createGeometryChunk({
            modelID: 0,
            ids: Array.from(viewer.selector.selectedElements[0]),
            color: "red",
        });
    });
    blueBtn.addEventListener("click", () => {
        viewer.utils.geometryUtils.createGeometryChunk({
            modelID: 0,
            ids: Array.from(viewer.selector.selectedElements[0]),
            color: "blue",
        });
    });
    input.addEventListener(
        "change",
        (changed) => {
            const file = changed.target.files[0];
            viewer.loadModel(file, true).then((model) => {
                console.log(model);
                console.log(viewer);
            });
            demoIfc.remove();
            demoBmt.remove();
            exportBmt.style.display = "block";
            input.remove();
        },
        false
    );
    demoIfc.addEventListener("click", () => {
        viewer.loadModel("/model.ifc", true).then((model) => {
            console.log(model);
            console.log(viewer);
        });
        demoIfc.remove();
        demoBmt.remove();
        exportBmt.style.display = "block";
        input.remove();
    });
    demoBmt.addEventListener("click", () => {
        viewer.loadModel("/model.bmt", true).then((model) => {
            console.log(model);
            console.log(viewer);
        });
        // viewer.loadModel("/model.bmt", true).then((model) => {
        //     console.log(model);
        //     console.log(viewer);
        // });
        demoIfc.remove();
        demoBmt.remove();
        exportBmt.style.display = "block";
        input.remove();
    });
    exportBmt.addEventListener("click", () => {
        console.log(111);
    });
    // demoIfc.click();
    // demoBmt.click();
});

// viewer.loadModel("/model.bmt", true).then((model) => {
//     console.log(model);
//     console.log(viewer);
// });

function onKeyDown(event) {
    // if (event.shiftKey) {
    //     const time = Date.now();
    //     viewer.bvhManager.applyThreeMeshBVH(
    //         viewer.models[0].geometry.threeGeometry.geometry
    //     );

    //     console.log(Date.now() - time, "ms");
    // }
    if (event.keyCode === 9) {
        event.preventDefault();
        viewer.selector.preSelection.setDeep;
    }
    if (event.code === "KeyH") {
        if (!viewer.selector.isSelected) return;
        viewer.utils.geometryUtils.hideSelectedElements();
    }
    if (event.code === "KeyI") {
        if (!viewer.selector.isSelected) return;
        viewer.utils.geometryUtils.isolateSelectedElements();
    }
    if (event.code === "KeyC") {
        if (event.altKey) {
            viewer.utils.geometryUtils.resetAllModelsChunks();
        } else {
            viewer.utils.geometryUtils.showAll();
        }
    }
    if (event.code === "KeyO") {
        viewer.context.controls.setOrbitByClick();
    }
    if (event.code === "KeyP") {
        if (event.altKey) {
            viewer.utils.clippingUtils.deleteAllPlanes();
        } else {
            const plane = viewer.utils.clippingUtils.createPlane();
        }
    }
}
window.viewer = viewer;
