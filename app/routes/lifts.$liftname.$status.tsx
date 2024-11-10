import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";

export const loader: LoaderFunction = async ({ params }) => {
  const { liftname, status } = params;
  return { liftname, status };
};

interface MatrixDisplayProps {
  text: string;
}

function statusToColor(status: string) {
  switch (status.toLowerCase()) {
    case "optimal":
      return "text-green-500";
    case "warning":
      return "text-yellow-500";
    case "max capacity":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

function statusToTextShadow(status: string) {
  switch (status.toLowerCase()) {
    case "Optimal":
      return "0px 0px 4px rgba(0, 255, 0, 0.7), 0px 0px 8px rgba(0, 255, 0, 0.5)";
    case "warning":
      return "0px 0px 4px rgba(255, 255, 0, 0.7), 0px 0px 8px rgba(255, 255, 0, 0.5)";
    case "max capacity":
      return "0px 0px 4px rgba(255, 0, 0, 0.7), 0px 0px 8px rgba(255, 0, 0, 0.5)";
    default:
      return "0px 0px 4px rgba(255, 255, 255, 0.7), 0px 0px 8px rgba(255, 255, 255, 0.5)";
  }
}

const MatrixDisplay = ({ text }: MatrixDisplayProps) => {
  return (
    <div className="bg-black p-4 absolute inset-0 flex items-center justify-center">
      <div className="flex gap-1">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={classNames("font-mono text-9xl", statusToColor(text))}
            style={{
              textShadow: statusToTextShadow(text),
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Lift() {
  const { status } = useLoaderData<typeof loader>();

  return (
    <div>
      <MatrixDisplay text={status} />
    </div>
  );
}
