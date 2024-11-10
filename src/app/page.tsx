'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useState, ChangeEvent, FormEvent } from 'react'
import { Check, Shuffle } from 'lucide-react'

interface FormData {
  firstname: string
  lastname: string
  dateofbirth: string
  nationality: string
  sex: 'm' | 'f'
}

interface ClassInfo {
  title: string
  description: string
  items: string
  vehicle: string
  image: string
}

interface LocationInfo {
  name: string
  description: string
  pros: string
  cons: string
  image: string
}

const classInfo: Record<string, ClassInfo> = {
  pracus: {
    title: "Pracuś",
    description: "Ciężką praca popłaca, pewnego dnia kupisz auto marzeń i zajedziesz nim na próg swojej willi.",
    items: "Plecak, Uprawnienie do wykonywania zawodu.",
    vehicle: "Emperor / FQ 2.",
    image: "/placeholder.svg?height=200&width=300"
  },
  zbir: {
    title: "Zbir",
    description: "Sprytem kupujesz pieniądze, moralność to tylko personalne odczucie... Które ty masz wypaczone.",
    items: "Nóż, Karteczka z podejrzanym numerem.",
    vehicle: "Esskey / Virgo.",
    image: "/placeholder.svg?height=200&width=300"
  },
  oficjel: {
    title: "Oficjel",
    description: "Honor i Naród to dla Ciebie najwyższe wartości, stoisz na straży bezpieczeństwa rodziny i słabszych.",
    items: "Latarka, 30 dni karnetu na siłownie.",
    vehicle: "Yosemite / Mesa.",
    image: "/placeholder.svg?height=200&width=300"
  }
}

const locationInfo: Record<string, LocationInfo> = {
  echopark: {
    name: "Paleto Bay",
    description: "Spokojne miasteczko, które ciągle się rozwija, do tego wiele atrakcji w postaci różnych rzeczy.",
    pros: "Duży wybór pracy od dorywczych po fabrki.",
    cons: "Agresywna młodzież, Bucowaci sąsiedzi.",
    image: "/placeholder.svg?height=200&width=300"
  },
  westhollywood: {
    name: "Paleto Bay - Las",
    description: "Idealne miejsce dla turystów, motel, kolejka górska i idealne miejsce do polowań.",
    pros: "Wiele atrakcji w okolicy.",
    cons: "Drogi motel jak na warunki, Duża liczba zgonów przez pumy.",
    image: "/placeholder.svg?height=200&width=300"
  },
  easthollywood: {
    name: "Grapeseed",
    description: "Biedne miasteczko z biednymi mieszkańcami z wieloma polami uprawnymi, gdzie pracuje większość mieszkańców.",
    pros: "Dużo miejsc pracy.",
    cons: "Bezdomni, Głośna autostrada w pobliżu.",
    image: "/placeholder.svg?height=200&width=300"
  }
}

export default function Component() {
  const display = useSelector((state: RootState) => state.app.display);
  const [step, setStep] = useState(1)
  const [characterClass, setCharacterClass] = useState<keyof typeof classInfo>('pracus')
  const [spawnLocation, setSpawnLocation] = useState<keyof typeof locationInfo>('echopark')
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    dateofbirth: '',
    nationality: '',
    sex: 'm'
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { ...formData, characterClass, spawnLocation })
    // Here you would typically send the data to your backend
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const randomizeField = (field: keyof FormData) => {
    let value = ''
    switch (field) {
      case 'firstname':
        value = ['Jan', 'Anna', 'Piotr', 'Maria', 'Krzysztof', 'Katarzyna'][Math.floor(Math.random() * 6)]
        break
      case 'lastname':
        value = ['Kowalski', 'Nowak', 'Wiśniewski', 'Wójcik', 'Kowalczyk', 'Kamińska'][Math.floor(Math.random() * 6)]
        break
      case 'dateofbirth':
        const year = Math.floor(Math.random() * (2005 - 1950) + 1950)
        const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
        const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
        value = `${month}.${day}.${year}`
        break
      case 'nationality':
        value = ['Polska', 'Niemcy', 'Ukraina', 'Rosja', 'Czechy', 'Słowacja'][Math.floor(Math.random() * 6)]
        break
    }
    setFormData(prevState => ({ ...prevState, [field]: value }))
  }

  return (
    {!display && (
      <div className="min-h-screen bg-[#040F0F] text-[#FCFFFC] font-sans flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-[#2D3A3A] rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-[#248232] p-8">
              <h2 className="text-2xl font-bold mb-6">Tworzenie Postaci</h2>
              <ul>
                {['Dane Osobowe', 'Wybierz Klasę', 'Wybierz Lokalizację'].map((title, index) => (
                  <li key={index} className={`flex items-center py-3 ${step === index + 1 ? 'text-[#FCFFFC]' : 'text-[#FCFFFC]/60'}`}>
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-3 ${step === index + 1 ? 'border-[#FCFFFC] bg-[#2BA84A]' : 'border-[#FCFFFC]/60'}`}>
                      {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                    </span>
                    {title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-2/3 p-8">
              <div className="h-[500px] overflow-y-auto mb-8">
                {step === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Dane Osobowe</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {(['firstname', 'lastname', 'dateofbirth', 'nationality'] as const).map((field) => (
                        <div key={field} className="flex items-center space-x-2">
                          <div className="flex-grow">
                            <label htmlFor={field} className="block mb-1">
                              {field === 'firstname' ? 'Imię' :
                              field === 'lastname' ? 'Nazwisko' :
                              field === 'dateofbirth' ? 'Data Urodzenia (MM.DD.RRRR)' :
                              'Obywatelstwo'}:
                            </label>
                            <div className="flex items-center">
                              <input 
                                type={field === 'dateofbirth' ? 'text' : 'text'}
                                id={field}
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                className="flex-grow bg-[#040F0F] text-[#FCFFFC] p-2 rounded mr-2" 
                                placeholder={field === 'dateofbirth' ? 'MM.DD.RRRR' : ''}
                                pattern={field === 'dateofbirth' ? '\\d{2}\\.\\d{2}\\.\\d{4}' : undefined}
                                required
                              />
                              <button 
                                type="button" 
                                onClick={() => randomizeField(field)}
                                className="bg-[#248232] p-2 rounded hover:bg-[#2BA84A] transition-colors"
                              >
                                <Shuffle className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div>
                        <label className="block mb-1">Płeć:</label>
                        <div className="flex space-x-4">
                          {(['m', 'f'] as const).map((sex) => (
                            <label key={sex} className="flex items-center">
                              <input 
                                type="radio" 
                                name="sex" 
                                value={sex} 
                                checked={formData.sex === sex}
                                onChange={handleInputChange}
                                className="hidden" 
                              />
                              <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2 ${formData.sex === sex ? 'bg-[#248232] border-[#FCFFFC]' : 'border-[#FCFFFC]'}`}>
                                {formData.sex === sex && <Check className="w-4 h-4 text-[#FCFFFC]" />}
                              </span>
                              {sex === 'm' ? 'Mężczyzna' : 'Kobieta'}
                            </label>
                          ))}
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Wybierz Klasę Postaci</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(classInfo).map(([key, value]) => (
                        <div
                          key={key}
                          className={`cursor-pointer p-4 rounded-lg ${characterClass === key ? 'bg-[#248232]' : 'bg-[#040F0F]'}`}
                          onClick={() => setCharacterClass(key as keyof typeof classInfo)}
                        >
                          <img src={value.image} alt={value.title} className="w-full h-32 object-cover rounded mb-2" />
                          <h4 className="font-bold">{value.title}</h4>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-bold mb-2">{classInfo[characterClass].title}</h4>
                      <p className="text-sm mb-2">{classInfo[characterClass].description}</p>
                      <p className="text-sm"><strong>Przedmioty:</strong> {classInfo[characterClass].items}</p>
                      <p className="text-sm"><strong>Pojazd:</strong> {classInfo[characterClass].vehicle}</p>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Wybierz Lokalizację Spawnu</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(locationInfo).map(([key, value]) => (
                        <div
                          key={key}
                          className={`cursor-pointer p-4 rounded-lg ${spawnLocation === key ? 'bg-[#248232]' : 'bg-[#040F0F]'}`}
                          onClick={() => setSpawnLocation(key as keyof typeof locationInfo)}
                        >
                          <img src={value.image} alt={value.name} className="w-full h-32 object-cover rounded mb-2" />
                          <h4 className="font-bold">{value.name}</h4>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="font-bold mb-2">{locationInfo[spawnLocation].name}</h4>
                      <p className="text-sm mb-2">{locationInfo[spawnLocation].description}</p>
                      <p className="text-sm"><strong>Zalety:</strong> {locationInfo[spawnLocation].pros}</p>
                      <p className="text-sm"><strong>Wady:</strong> {locationInfo[spawnLocation].cons}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                {step > 1 && (
                  <button onClick={prevStep} className="px-4 py-2 bg-[#040F0F] text-[#FCFFFC] rounded hover:bg-[#248232] transition-colors">
                    Wstecz
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={nextStep} className="px-4 py-2 bg-[#248232] text-[#FCFFFC] rounded hover:bg-[#2BA84A] transition-colors ml-auto">
                    Dalej
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="px-4 py-2 bg-[#248232] text-[#FCFFFC] rounded hover:bg-[#2BA84A] transition-colors ml-auto">
                    Zakończ tworzenie postaci
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  )
}
