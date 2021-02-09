// React import
import React, { useState } from "react";
// Incomes component import
import { Incomes } from "../../components/Incomes/Incomes";
import { IncomesAnalysis } from "../../components/Incomes/IncomesAnalysisChart";
import { IncomesAnalysisPie } from "../../components/Incomes/IncomesAnalysisPie";
import { NewIncomesModal } from "../../components/Incomes/NewIncomesModal"
// Material-ui import
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core/styles";
// Styled component import
import styles from "assets/jss/material-dashboard-react/views/incomesStyle";

const useStyles = makeStyles(styles);

export function IncomesPage() {
  const classes = useStyles();
  // State hooks
  const [incomes, setIncomes] = useState([]);
  const [viewBarChart, setViewBarChart] = useState(true);
  const [deletedOrUpdated, setDeletedOrUpdated] = useState(true);

  // Sort button onclick to change between pie and bar chart
  function onClickToChangeChart() {
    if (!viewBarChart) {
      setViewBarChart(true);
    } else {
      setViewBarChart(false);
    }
  }

  return (
    <>
      <div className={classes.newButton}>
        <NewIncomesModal deletedOrUpdated={deletedOrUpdated} setDeletedOrUpdated={setDeletedOrUpdated} incomes={incomes}></NewIncomesModal>
      </div>

      <Grid container className={classes.incomesContainer}>
        <Grid item xs={12} md={12} lg={7} xl={8}>
          <Grid className={classes.incomesAnalysisContainer}>
            <Grid item xs={12} md={12} lg={11} xl={11}>
              <Card chart className={classes.incomesAnalysisCard}>
                <CardHeader>
                  <h3 className={classes.cardTitle}>Income Analysis</h3>
                </CardHeader>
                <CardBody>
                  {viewBarChart && <IncomesAnalysis incomes={incomes} />}
                  {!viewBarChart && <IncomesAnalysisPie incomes={incomes} />}
                  <div className="toggle-button">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={onClickToChangeChart}
                      className={classes.sortButton}
                    >
                      Sort By
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={5} xl={4}>
          <Grid className={classes.incomesHistoryContainer}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Card className={classes.incomesHistoryCard}>
                <CardHeader className={classes.incomesHistoryCardHeader}>
                  <h3 className={classes.cardTitle}>Income History</h3>
                </CardHeader>
                <CardBody className={classes.incomesHistoryCardBody}>
                  <Incomes deletedOrUpdated={deletedOrUpdated} setDeletedOrUpdated={setDeletedOrUpdated} incomes={incomes} setIncomes={setIncomes} />
                </CardBody>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
