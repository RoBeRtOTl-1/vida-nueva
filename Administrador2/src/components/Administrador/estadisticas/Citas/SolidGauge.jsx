import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const Citas_SolidGauge = ({ data }) => {
    useEffect(() => {
        const root = am5.Root.new("chartdiv4");

        root.setThemes([am5themes_Animated.new(root)]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                endAngle: 270
            })
        );

        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                endAngle: 270,
                labelsEnabled: false
            })
        );

        series.states.create("hidden", {
            endAngle: -90
        });


        series.data.setAll(data);

        series.appear(1000, 100);

        series.labels.template.set("visible", false);
        series.ticks.template.set("visible", false);

        return () => {
            root.dispose();
        };
    }, [data]);

    return <div id="chartdiv4" style={{ width: "100%", height: "500px" }}></div>;
};

export default Citas_SolidGauge;
