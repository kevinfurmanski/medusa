import { Button, Container, Heading } from "@medusajs/ui"

import { DataTable } from "../../../../../components/table/data-table"
import { Link } from "react-router-dom"
import { reservationListExpand } from "../../constants"
import { useDataTable } from "../../../../../hooks/use-data-table"
import { useReservationTableColumns } from "./use-reservation-table-columns"
import { useReservationTableFilters } from "./use-reservation-table-filters"
import { useReservationTableQuery } from "./use-reservation-table-query"
import { useReservations } from "../../../../../hooks/api/reservations"
import { useTranslation } from "react-i18next"

const PAGE_SIZE = 20

export const ReservationListTable = () => {
  const { t } = useTranslation()

  const { searchParams, raw } = useReservationTableQuery({
    pageSize: PAGE_SIZE,
  })
  const { reservations, count, isLoading, isError, error, ...rest } =
    useReservations({
      ...searchParams,
    })

  const filters = useReservationTableFilters()
  const columns = useReservationTableColumns()

  const { table } = useDataTable({
    data: reservations || [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
  })

  if (isError) {
    throw error
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{t("reservations.domain")}</Heading>
        <Button variant="secondary" size="small" asChild>
          <Link to="create">{t("actions.create")}</Link>
        </Button>
      </div>
      <DataTable
        table={table}
        columns={columns}
        pageSize={PAGE_SIZE}
        count={count}
        isLoading={isLoading}
        filters={filters}
        pagination
        navigateTo={(row) => `${row.id}`}
        // orderBy={["created_at", "updated_at"]}
        // queryObject={raw}
        search={false}
      />
    </Container>
  )
}
