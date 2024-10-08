import {
  DataGrid,
  GridSlotsComponent,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { StylesgridProps } from "./styles/gridProps";

interface MyGridProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  data?: T[];
  slots?: Partial<GridSlotsComponent>;
}

export const MyGrid = <T extends { eId: number }>({
  data,
  columns,
  slots,
}: MyGridProps<T>) => {
  return (
    <DataGrid
      rows={data ?? []}
      getRowId={(row) => row.eId}
      columns={columns}
      slots={slots}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[3, 5, 10, 20, 100]}
      sx={{ ...StylesgridProps }}
    />
  );
};