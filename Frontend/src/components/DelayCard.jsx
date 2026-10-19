import {
  TrendingUp,
  TrendingDown,
  Clock,
} from "lucide-react";

function DelayCard({
  title,
  value,
  description,
  trend,
  positive,
}) {
  return (
    <div className="delay-card">

      <div className="delay-card-top">
        <div className="delay-icon">
          <Clock size={20} />
        </div>

        <div
          className={`trend ${
            positive ? "positive" : "negative"
          }`}
        >
          {positive ? (
            <TrendingDown size={14} />
          ) : (
            <TrendingUp size={14} />
          )}

          {trend}
        </div>
      </div>

      <div className="delay-value">
        {value}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default DelayCard;