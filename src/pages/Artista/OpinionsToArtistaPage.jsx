import OpinionesArtistaCard from "../../components/OpinionToArtistCard"
import { opiniones } from "../../data/opiniones"


const OpinionsToArtistaPage = () => {
  
    return (
    <div className="w-90">
        <div className="w-90 d-flex flex-column px-4">
            <div className="mb-4">
                <h2>Opiniones sobre mi</h2>
            </div>

            <div className="bg-white border border-2 border-tertiary rounded-3 p-3 mb-3">
            <OpinionesArtistaCard opiniones={opiniones} />
            </div>
        </div>
    </div>
  )
}
export default OpinionsToArtistaPage

