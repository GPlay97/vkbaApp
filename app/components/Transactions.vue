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
            <ActionItem icon="res://navigation/menu" 
                android:visibility="collapsed" 
                @tap="onDrawerButtonTap"
                ios.position="left">
            </ActionItem>
            <Label class="action-bar-title" text="Transaktionen"></Label>
        </ActionBar>
        <GridLayout class="page-content">
            <StackLayout orientation="vertical" dock="top">
                <ListView class="list-group transactions-list" for="transaction in transactions" style="height:1500px">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Image :src="transaction.imageSrc" class="thumb img-circle" />
                            <Label :text="transaction.name" class="list-group-item-heading" style="width: 30%" alignSelf="center" />
                            <Label v-if="transaction.name === 'LegendSkyFall'" text.decode="&#xf100;" class="fa list-group-item-heading" style="width: 20%; text-align: right" alignSelf="center" color="green" />
                            <Label v-else text.decode="&#xf101;" class="fa list-group-item-heading" style="width: 20%; text-align: right" alignSelf="center" color="red" />
                            <Label :text="transaction.amount + ' KAD'" class="list-group-item-heading amount" style="width: 30%; text-align: right" alignSelf="center" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout>
            <GridLayout rows="*,auto">
                <Button row="1" class="btn btn-primary" text="Neue Transaktion"></Button>
            </GridLayout>
        </GridLayout>

    </Page>
</template>

<script>
    import * as utils from "~/shared/utils";
    import SelectedPageService from "../shared/selected-page-service";

    export default {
        data: () => ({
            transactions: [{
                        name: "LegendSkyFall",
                        amount: 30,
                        imageSrc: "https:/cravatar.eu/avatar/LegendSkyFall"
                    },
                    {
                        name: "Niki0311",
                        amount: 1025,
                        imageSrc: "https:/cravatar.eu/avatar/Niki0311"
                    },
                    {
                        name: "LegendSkyFall",
                        amount: 22,
                        imageSrc: "https:/cravatar.eu/avatar/LegendSkyFall"
                    },
                    {
                        name: "125m125",
                        amount: 789,
                        imageSrc: "https:/cravatar.eu/avatar/125m125"
                    },
                    {
                        name: "Niki0311",
                        amount: 40,
                        imageSrc: "https:/cravatar.eu/avatar/Niki0311"
                    },
                    {
                        name: "LegendSkyFall",
                        amount: 200,
                        imageSrc: "https:/cravatar.eu/avatar/LegendSkyFall"
                    },
                    {
                        name: "125m125",
                        amount: 11,
                        imageSrc: "https:/cravatar.eu/avatar/125m125"
                    },
                    {
                        name: "125m125",
                        amount: 22,
                        imageSrc: "https:/cravatar.eu/avatar/125m125"
                    },
                    {
                        name: "125m125",
                        amount: 33,
                        imageSrc: "https:/cravatar.eu/avatar/125m125"
                    }
            ]
        }),
        mounted() {
            SelectedPageService.getInstance().updateSelectedPage("Transactions");
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
    .transactions-list {
        background-color: $theme-color;
        & .list-group-item {
            background-color: $theme-color;
            & .list-group-item-heading {
                &.amount {
                    color: #89D5E2;
                }
            }
        }
    }
</style>