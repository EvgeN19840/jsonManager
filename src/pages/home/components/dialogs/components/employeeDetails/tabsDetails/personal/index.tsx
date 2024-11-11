
// ** MUI
import { Box, Typography } from "@mui/material";

// ** Hooks
import { useModal } from "@/hooks/useModal";

// ** Types
import { IEmployee } from "@/const/types";

export const PersonalTab: React.FC = () => {
  const { dataForDialog, } = useModal();
  const employeeData = dataForDialog as IEmployee;

  return (
    <Box>
      {employeeData  ? (
        <Box sx={{ width: "100%", padding: 2, border: '1px solid #ccc' }}>
          <Typography>ID: {employeeData.eId}</Typography>
          <Typography>Number: {employeeData.number}</Typography>
          <Typography>
            Name: {`${employeeData.firstName} ${employeeData.middleName || ""} ${employeeData.lastName}`}
          </Typography>
          <Typography>Birth Date: {employeeData.birthDate || "N/A"}</Typography>
          <Typography>Email: {employeeData.email || "N/A"}</Typography>
          <Typography>Hire Date: {employeeData.hireDate}</Typography>
          <Typography>End Date: {employeeData.endDate || "N/A"}</Typography>
          <Typography>Status: {employeeData.enabledForCayPay ? "Enabled" : "Disabled"}</Typography>
          <Typography>Pension Member Number: {employeeData.pensionMemberNumber}</Typography>
          <Typography>Health Insurance Member Number: {employeeData.healthInsuranceMemberNumber}</Typography>
          <Typography>Life Insurance Member Number: {employeeData.lifeInsuranceMemberNumber}</Typography>
          <Typography>
            Transfer Employee Statutory to Voluntary on Cap: {employeeData.transferEmployeeStatutoryToVoluntaryOnCap ? "Yes" : "No"}
          </Typography>
          <Typography>
            Transfer Company Statutory to Voluntary on Cap: {employeeData.transferCompanyStatutoryToVoluntaryOnCap ? "Yes" : "No"}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};