import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
interface CardComponentProps {
  title: string;
  color1: string;
  color2: string;
}

const CardComponent: React.FC<CardComponentProps> = (props) => {
  // View
  return (
    <div className="content">
      <Card
        sx={{
          minWidth: 275,
          background: `linear-gradient(${props.color1},${props.color2})`,
          color: 'white',
          transform: `rotateY(360deg)`,
          transition: '0.3s',
        }}
      >
        <CardContent>
          <h4>{props.title}</h4>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
