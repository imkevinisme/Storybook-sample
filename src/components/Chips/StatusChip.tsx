import Chip, { ChipProps, ChipVariant } from "./index";


type StatusType = 'delivered' | 'processing' | 'in_transit' | 'error';

interface StatusChipProps extends Omit<ChipProps, 'text'> {
    status: StatusType;
}

const statusConfig: Record<StatusType, { variant: ChipVariant, label: string }> = {
    delivered: { variant: 'success', label: 'Delivered' },
    processing: { variant: 'primary', label: 'Processing' },
    in_transit: { variant: 'warning', label: 'In Transit' },
    error: { variant: 'danger', label: 'Error' }
};

export const StatusChip = ({ status, ...props }: StatusChipProps) => {
    const config = statusConfig[status];

    return (
        <Chip
        {...props}
            variant={config.variant}
            text={status.replace('_', ' ').toUpperCase()}
        />
    );
};

export default StatusChip;
