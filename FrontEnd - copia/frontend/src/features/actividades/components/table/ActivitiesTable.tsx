import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { activitiesStore } from '../../context/ActividadStore'
import { IGetActivityDTO } from '../../DTOs/IGetActivitiesDTO'
import { enumActivityState } from '../../../../shared/enums/enumActivityState'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import StatusBadge from '../../../../shared/componets/tables/StatusBadgeProps '
import FinishTaskButton from '../../../../shared/componets/buttons/TerminaActividad'
import ViewDetailButton from '../../../../shared/componets/buttons/VerDteallesButton'

export default function ActivitiesTable() {
  const { activitiesList, isLoadingActivities, getActivities } = activitiesStore()
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    getActivities()
  }, [getActivities])

  const AddButton = ({ text, icon, action }: { text: string; icon?: string; action?: () => void }) => (
    <Button
      label={text}
      icon={icon}
      iconPos="left"
      onClick={action}
      className="p-button-sm p-button-rounded p-button-primary shadow-md hover:shadow-lg transition-shadow duration-200"
    />
  )

  const leftToolbarTemplate = () => <h2 className="text-xl font-semibold">Actividades Productivas</h2>

  const rightToolbarTemplate = () => <AddButton text="Agregar" icon="pi pi-plus" action={() => console.log('Agregar nueva actividad')} />

  const funcionesBody = (row: IGetActivityDTO) => <span className="line-clamp-2" title={row.funciones}>{row.funciones}</span>

  const estadoBody = (row: IGetActivityDTO) => {
    switch (row.estado) {
      case enumActivityState.Cancelada:
        return <StatusBadge text={row.estado} bgcolor="var(--estado-cancelada-bg)" color="var(--estado-cancelada-txt)" />
      case enumActivityState.Terminada:
        return <StatusBadge text={row.estado} bgcolor="var(--estado-terminada-bg)" color="var(--estado-terminada-txt)" />
      case enumActivityState.Pendiente:
        return <StatusBadge text={row.estado} bgcolor="var(--estado-pendiente-bg)" color="var(--estado-pendiente-txt)" />
      default:
        return <StatusBadge text={row.estado} />
    }
  }

  const handleViewDetail = (row: IGetActivityDTO) => {
    console.log('Ver detalles de:', row)
  }

  const handleFinishTask = (row: IGetActivityDTO) => {
    console.log('Terminar tarea de:', row)
  }

  const accionesBody = (row: IGetActivityDTO) => (
    <>
      <FinishTaskButton onClick={() => handleFinishTask(row)} />
      <ViewDetailButton onClick={() => handleViewDetail(row)} />
    </>
  )

  return (
    <div className="card">
      <Toolbar className="mb-2" left={leftToolbarTemplate} right={rightToolbarTemplate} />

      <div className="flex justify-start mb-2">
        <InputText
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          className="p-inputtext-sm w-64"
        />
      </div>

      <DataTable
        value={activitiesList}
        loading={isLoadingActivities}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        globalFilter={globalFilter}
        emptyMessage="No hay actividades registradas"
      >
        <Column field="usuario" header="Usuario" sortable />
        <Column field="funciones" header="Funciones" body={funcionesBody} sortable />
        <Column field="hora_inicio" header="Hora inicio" sortable />
        <Column field="hora_final" header="Hora final" sortable />
        <Column field="duracion" header="Duración" sortable />
        <Column field="fecha" header="Fecha" sortable />
        <Column field="estado" header="Estado" body={estadoBody} />
        <Column
          header="Acciones"
          body={accionesBody}
          bodyStyle={{ display: 'flex', justifyContent: 'center', gap: '8px' }}
          style={{ width: '120px' }}
        />
      </DataTable>
    </div>
  )
}
