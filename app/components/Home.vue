<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <!-- 
            Use the NavigationButton as a side-drawer button in Android
            because ActionItems are shown on the right side of the ActionBar
            -->
            <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
            <!-- 
            Use the ActionItem for IOS with position set to left. Using the
            NavigationButton as a side-drawer button in iOS is not possible,
            because its function is to always navigate back in the application.
            -->
            <ActionItem icon="res://navigation/menu" android:visibility="collapsed" @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Home"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <StackLayout class="home-panel">

                <DockLayout stretchLastChild="true">
                    <!-- Head -->
                    <StackLayout orientation="vertical" dock="top">
                        <GridLayout columns="*" rows="auto, auto" class="m-y-30 m-x-20">
                            <Label text="Kontostand" row="0" col="0" class="large" />
                        </GridLayout>
                        <GridLayout columns="auto, auto" rows="auto, auto" margin="0 20 20 20">
                            <Label text="7.454 KAD" row="0" col="0" class="medium p-r-20" color="#89D5E2" />
                        </GridLayout>
                        <Button class="btn btn-primary" text="Einzahlen"></Button>
                        <Button class="btn btn-warning" text="Auszahlen"></Button>
                    </StackLayout>
                    <!-- /Head -->
                    <!-- Chart -->
                    <StackLayout orientation="vertical" class="p-t-30" backgroundColor="#282E4B" dock="bottom">
                        <GridLayout rows="auto, *" columns="*" height="1000px">
                            <RadCartesianChart row="1" col="0" selectionMode="Single" backgroundColor="transparent"
                                color="white" width="100%">
                                <CategoricalAxis lineColor="#30D8D8D8" labelTextColor="#C2C8E6" labelSize="11"
                                    lineThickness="1" labelLayoutMode="inner" lineHidden="true" labelMargin="10"
                                    v-tkCartesianHorizontalAxis />
                                <LinearAxis lineColor="#30D8D8D8" lineThickness="1" labelTextColor="#C2C8E6" labelLayoutMode="inner"
                                    v-tkCartesianVerticalAxis />
                                <SplineAreaSeries seriesName="Area" categoryProperty="Day" :items="currentMonth"
                                    stackMode="None" valueProperty="Amount" selectionMode="Series"
                                    v-tkCartesianSeries />
                                <SplineAreaSeries seriesName="Area" categoryProperty="Day" :items="lastMonth"
                                    stackMode="None" valueProperty="Amount" selectionMode="Series"
                                    v-tkCartesianSeries />
                                <RadCartesianChartGrid horizontalLinesVisible="true" verticalLinesVisible="false"
                                    verticalStripLinesVisible="false" horizontalStripLinesVisible="false"
                                    horizontalStrokeColor="#30D8D8D8" v-tkCartesianGrid />
                                <Palette seriesName="Area" v-tkCartesianPalette>
                                    <PaletteEntry fillColor="#3051599A" strokeColor="#7FCFDC" strokeWidth="2" />
                                    <PaletteEntry fillColor="#109BABFF" strokeColor="#109BABFF" strokeWidth="2" />
                                </Palette>
                                <Palette seriesName="Area" seriesState="Selected" v-tkCartesianPalette>
                                    <PaletteEntry fillColor="#6051599A" strokeColor="#7FCFDC" strokeWidth="2" />
                                    <PaletteEntry fillColor="#409BABFF" strokeColor="#609BABFF" strokeWidth="2" />
                                </Palette>
                            </RadCartesianChart>
                        </GridLayout>
                    </StackLayout>
                    <!-- /Chart -->
                </DockLayout>
            </StackLayout>
        </GridLayout>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import Vue from "nativescript-vue";
    import SelectedPageService from "../shared/selected-page-service";
    import RadCartesianChart from "nativescript-ui-chart/vue";
    Vue.use(RadCartesianChart);

    export default {
        data: () => ({
            currentMonth: [{
                        Day: "1",
                        Amount: 51
                    },
                    {
                        Day: "10",
                        Amount: 20
                    },
                    {
                        Day: "15",
                        Amount: 89
                    },
                    {
                        Day: "20",
                        Amount: 110
                    }
                ],
                lastMonth: [{
                        Day: "1",
                        Amount: 60
                    },
                    {
                        Day: "10",
                        Amount: 50
                    },
                    {
                        Day: "15",
                        Amount: 91
                    },
                    {
                        Day: "20",
                        Amount: 95
                    },
                    {
                        Day: "31",
                        Amount: 160
                    }
                ]
        }),
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Home");
        },
        methods: {
            onDrawerButtonTap() {
                utils.showDrawer();
            }
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
</style>