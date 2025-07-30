import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ContentDetail = () => {
  const { id } = useParams();
  const contentItem = useSelector((state) =>
    state.content.items.find((item) => item._id === id)
  );

  if (!contentItem) {
    return <p>Content not found.</p>;
  }

  const getYouTubeId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="container mt-4">
      <h2>{contentItem.title}</h2>

      {contentItem.type === "video" ? (
        getYouTubeId(contentItem.url) ? (
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              marginBottom: "1rem",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(
                contentItem.url
              )}`}
              title={contentItem.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        ) : (
          <video controls src={contentItem.url} style={{ width: "100%" }} />
        )
      ) : contentItem.type === "image" ? (
        <img
          src={contentItem.url}
          alt={contentItem.title}
          className="img-fluid mb-3"
        />
      ) : null}

      {/* Description below video/image */}
      {contentItem.description && (
        <p className="mb-4">{contentItem.description}</p>
      )}

      <p>
        <strong>Tags:</strong>{" "}
        {contentItem.tags && contentItem.tags.length > 0
          ? contentItem.tags.join(", ")
          : "No tags"}
      </p>

      <a href={contentItem.url} target="_blank" rel="noopener noreferrer">
        Open Original Content
      </a>
    </div>
  );
};

export default ContentDetail;
