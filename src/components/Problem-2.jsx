import React, { useEffect, useRef, useState } from "react";

const Problem2 = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [usContacts, setUSContacts] = useState([]);
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [currentPageA, setCurrentPageA] = useState(1);
  const [currentPageB, setCurrentPageB] = useState(1);
  const [country, setCountry] = useState("");
  console.log(country);

  const modalARef = useRef(null);
  const modalBRef = useRef(null);
  console.log(allContacts);

  useEffect(() => {
    if (showModalA) {
      getData(
        "https://contact.mediusware.com/api/contacts/",
        currentPageA,
        setAllContacts
      );
      setCurrentPageA(currentPageA + 1);
    }
  }, [showModalA]);

  useEffect(() => {
    if (showModalB) {
      getData(
        `https://contact.mediusware.com/api/country-contacts/${country}`,
        currentPageB,
        setUSContacts
      );
      setCurrentPageB(currentPageB + 1);
    }
  }, [showModalB, country]);

  const getData = (url, page, setData) => {
    fetch(`${url}?page=${page}`)
      .then((res) => res.json())
      .then((data) => setData((prev) => [...prev, ...data.results]));
  };

  const openModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    setCurrentPageA(1);
  };

  const openModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    setCurrentPageB(1);
  };

  const openModalC = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(true);
  };

  const closeModal = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

  const handleScroll = () => {
    const modal = showModalA ? modalARef.current : modalBRef.current;
    if (modal && modal.scrollTop + modal.clientHeight >= modal.scrollHeight) {
      if (showModalA) {
        getData(
          "https://contact.mediusware.com/api/contacts/",
          currentPageA,
          setAllContacts
        );
        setCurrentPageA(currentPageA + 1);
      } else if (showModalB) {
        getData(
          `https://contact.mediusware.com/api/country-contacts/${country}`,
          currentPageB,
          setUSContacts
        );
        setCurrentPageB(currentPageB + 1);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={openModalA}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => {
              setCountry("United States");
              openModalB();
            }}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>

        {/* Modals */}
        {showModalA && (
          <div
            ref={modalARef}
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
            onScroll={handleScroll}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal A - All Contacts</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {allContacts.map((contact, index) => (
                    <div
                      key={index}
                      onClick={openModalC}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{contact.phone}</p>
                      <p>{contact.country.name}</p>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    onClick={openModalA}
                    className="btn btn-primary"
                    type="button"
                  >
                    Modal Button A
                  </button>
                  <button
                    onClick={() => {
                      setCountry("United States");
                      openModalB();
                    }}
                    className="btn btn-warning"
                    type="button"
                  >
                    Modal Button B
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn btn-secondary"
                    type="button"
                  >
                    Modal Button C - Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {showModalB && (
          <div
            ref={modalBRef}
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
            onScroll={handleScroll}
          >
            {/* Modal Content */}
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal B - US Contacts</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {usContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={openModalC}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{contact.phone}</p>
                      <p>{contact.country.name}</p>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    onClick={openModalA}
                    className="btn btn-primary"
                    type="button"
                  >
                    Modal Button A
                  </button>
                  <button
                    onClick={() => {
                      setCountry("United States");
                      openModalB();
                    }}
                    className="btn btn-warning"
                    type="button"
                  >
                    Modal Button B
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn btn-secondary"
                    type="button"
                  >
                    Modal Button C - Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {showModalC && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            {/* Modal Content */}
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal C - Contact Details</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {allContacts.map((contact, index) => (
                    <div
                      key={index}
                      onClick={openModalC}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{contact.phone}</p>
                      <p>{contact.country.name}</p>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    onClick={closeModal}
                    className="btn btn-secondary"
                    type="button"
                  >
                    Modal Button C - Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problem2;
