import Button from "../../ui/Button";

function ToggleMapOverviewButton({ showMapOverview, setShowMapOverview }) {
  return (
    <Button
      type="primary"
      handleClick={() => setShowMapOverview((show) => !show)}
    >
      <div className="mx-0.5 flex items-center space-x-5">
        <span className="text-sm font-semibold">
          {showMapOverview ? "Hide Top Window" : "Show Top Window"}
        </span>
      </div>
    </Button>
  );
}

export default ToggleMapOverviewButton;
