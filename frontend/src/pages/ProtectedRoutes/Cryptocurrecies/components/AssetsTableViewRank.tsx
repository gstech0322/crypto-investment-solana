import TableCell from '@mui/material/TableCell';

interface Props {
  rank: number;
}

const AssetsTableViewRank: React.FC<Props> = (props) => {
  const { rank } = props;
  return (
    <TableCell sx={{ color: 'white' }}>
      <h4>{rank}</h4>
    </TableCell>
  );
};
export default AssetsTableViewRank;
