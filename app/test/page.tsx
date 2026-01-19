import React from "react";

const page = () => {
  return (
    <div className="min-h-[50vh] min-w-screen">
      <iframe
        src="https://euttube.com/wp-content/plugins/clean-tube-player/public/player-x.php?q=cG9zdF9pZD00ODY5JnR5cGU9dmlkZW8mdGFnPSUzQ3ZpZGVvJTIwaWQlM0QlMjJ3cHN0LXZpZGVvJTIyJTIwY2xhc3MlM0QlMjJ2aWRlby1qcyUyMHZqcy1iaWctcGxheS1jZW50ZXJlZCUyMiUyMGNvbnRyb2xzJTIwcHJlbG9hZCUzRCUyMmF1dG8lMjIlMjB3aWR0aCUzRCUyMjY0MCUyMiUyMGhlaWdodCUzRCUyMjI2NCUyMiUyMHBvc3RlciUzRCUyMmh0dHBzJTNBJTJGJTJGZXV0dHViZS5jb20lMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjUlMkYwMiUyRkdhbGluZy1zdW1hbGF0LW5pLWluc2FuLTY0MHgzNjAuanBnJTIyJTNFJTNDc291cmNlJTIwc3JjJTNEJTIyaHR0cHMlM0ElMkYlMkZrYXlhdGFuLmNjJTJGd3AtY29udGVudCUyRnVwbG9hZHMlMkYyMDI1JTJGMDIlMkZHYWxpbmctc3VtYWxhdC1uaS1pbnNhbi5tcDQlMjIlMjB0eXBlJTNEJTIydmlkZW8lMkZtcDQlMjIlM0UlM0MlMkZ2aWRlbyUzRQ="
        sandbox="allow-scripts allow-same-origin allow-orientation-lock allow-presentation allow-fullscreen"
        width={"300px"}
        height={"300px"}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default page;
