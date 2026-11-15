import React, { useState, useEffect, useRef } from 'react';
import PhotoItem from './PhotoItem';

function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const observerTarget = useRef(null);
  const isFetchingRef = useRef(false);
  const fetchedPagesRef = useRef(new Set());

  const fetchPhotos = async (pageNumber) => {
    if (isFetchingRef.current || fetchedPagesRef.current.has(pageNumber) || !hasMore) {
      return;
    }

    isFetchingRef.current = true;
    fetchedPagesRef.current.add(pageNumber);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumber}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch photos (status: ${response.status})`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => {
          const existingIds = new Set(prevPhotos.map((item) => item.id));
          const newPhotos = data.filter((item) => !existingIds.has(item.id));
          return [...prevPhotos, ...newPhotos];
        });
        setPage(pageNumber + 1);
      }
    } catch (err) {
      fetchedPagesRef.current.delete(pageNumber);
      setError(err.message || 'An error occurred while fetching photos.');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchPhotos(1);
  }, []);

  useEffect(() => {
    if (!hasMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingRef.current && hasMore) {
          fetchPhotos(page);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [page, hasMore, loading]);

  const handleRetry = () => {
    fetchPhotos(page);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Photo gallery</h1>

      <div className="photo-list">
        {photos.map((photo) => (
          <PhotoItem key={photo.id} photo={photo} />
        ))}
      </div>

      {error && (
        <div className="gallery-error">
          <p>{error}</p>
          <button type="button" className="retry-btn" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="gallery-loading">
          <div className="spinner" />
          <span>Loading more photos...</span>
        </div>
      )}

      {!hasMore && (
        <div className="gallery-end">
          <p>No more photos available.</p>
        </div>
      )}

      <div ref={observerTarget} className="scroll-sentinel" />
    </div>
  );
}

export default PhotoGallery;
