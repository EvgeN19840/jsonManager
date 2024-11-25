import { Typography } from "@mui/material";

import { useModal } from "@/hooks/useModal";
import { EditDetailsBenefits } from "./editDetailsBenefits";
import { CustomDialog } from "@/shared/components/customDialog";
import { EditPersonalTab } from "./editPersonal";
import { JobInfo } from "./editJobData/components/jobInfo";
import { Salary } from "./editJobData/components/salary";
import { EmploymentStatus } from "./editJobData/components/status";
import { EditDepositAccounts } from "./editDepositAccounts";


export const TabsDetailsEdit: React.FC = () => {
  const { typeModalDetailsEdit, isDialogOpen, closeDialog } = useModal();
  const renderTabContent = () => {
    switch (typeModalDetailsEdit) {
      case "Edit benefits details":
        return <EditDetailsBenefits />;
      case "Edit Personal":
        return <EditPersonalTab />;
      case "Edit job":
        return <JobInfo />;
      case "Edit salary":
        return <Salary />;
      case "Edit status":
        return <EmploymentStatus />;
      case "Edit Bonus":
        return "Edit Bonus";
      case "Edit deposit accounts":
        return <EditDepositAccounts />;
      default:
        return <Typography>Select a tab to view details.</Typography>;
    }
  };

  return (
    <CustomDialog onClose={closeDialog} open={isDialogOpen} maxWidth="sm">
      {renderTabContent()}
    </CustomDialog>
  );
};