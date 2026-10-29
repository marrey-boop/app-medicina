import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/FormFields';
import { PageHeader } from '../components/layout/PageHeader';
import { Alert } from '../components/ui/Alert';

const ASIGNATURAS = [
  'Anatomía',
  'Bioquímica',
  'Embriología',
  'Endocrinología',
  'Farmacología',
  'Fisiología',
  'Histología',
  'Medicina Interna',
  'Microbiología',
  'Neurología',
  'Obstetricia',
  'Patología',
  'Pediatría',
  'Semiología Médica',
  'Otro',
];

interface FormData {
  pregunta: string;
  respuesta: string;
  asignatura: string;
  asignaturaPersonalizada: string;
  tema: string;
}

interface FormErrors {
  pregunta?: string;
  respuesta?: string;
  asignatura?: string;
  tema?: string;
}

export function FlashcardFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const agregarFlashcard = useAppStore((s) => s.agregarFlashcard);
  const editarFlashcard = useAppStore((s) => s.editarFlashcard);
  const flashcards = useAppStore((s) => s.flashcards);

  const fcExistente = id ? flashcards.find((f) => f.id === id) : null;
  const esEdicion = Boolean(fcExistente);

  const [form, setForm] = useState<FormData>({
    pregunta: fcExistente?.pregunta ?? '',
    respuesta: fcExistente?.respuesta ?? '',
    asignatura: ASIGNATURAS.includes(fcExistente?.asignatura ?? '')
      ? (fcExistente?.asignatura ?? '')
      : fcExistente
      ? 'Otro'
      : '',
    asignaturaPersonalizada:
      ASIGNATURAS.includes(fcExistente?.asignatura ?? '') ? '' : (fcExistente?.asignatura ?? ''),
    tema: fcExistente?.tema ?? '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [guardado, setGuardado] = useState(false);
  const [guardandoOtra, setGuardandoOtra] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.pregunta.trim()) newErrors.pregunta = 'La pregunta es obligatoria';
    else if (form.pregunta.trim().length < 5) newErrors.pregunta = 'La pregunta es demasiado corta';
    if (!form.respuesta.trim()) newErrors.respuesta = 'La respuesta es obligatoria';
    else if (form.respuesta.trim().length < 5) newErrors.respuesta = 'La respuesta es demasiado corta';
    if (!form.asignatura) newErrors.asignatura = 'Selecciona una asignatura';
    if (form.asignatura === 'Otro' && !form.asignaturaPersonalizada.trim())
      newErrors.asignatura = 'Ingresa el nombre de la asignatura';
    if (!form.tema.trim()) newErrors.tema = 'El tema es obligatorio';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function getAsignaturaFinal() {
    return form.asignatura === 'Otro' ? form.asignaturaPersonalizada.trim() : form.asignatura;
  }

  function handleSubmit(crearOtra = false) {
    if (!validate()) return;
    const data = {
      pregunta: form.pregunta.trim(),
      respuesta: form.respuesta.trim(),
      asignatura: getAsignaturaFinal(),
      tema: form.tema.trim(),
    };

    if (esEdicion && id) {
      editarFlashcard(id, data);
    } else {
      agregarFlashcard(data);
    }

    if (crearOtra) {
      setForm({ pregunta: '', respuesta: '', asignatura: form.asignatura, asignaturaPersonalizada: form.asignaturaPersonalizada, tema: form.tema });
      setGuardandoOtra(true);
      setTimeout(() => setGuardandoOtra(false), 2000);
    } else {
      setGuardado(true);
      setTimeout(() => navigate('/flashcards'), 1200);
    }
  }

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <PageHeader
        title={esEdicion ? 'Editar flashcard' : 'Nueva flashcard'}
        subtitle="Crea tarjetas de estudio con pregunta y respuesta"
        icon={<CreditCard size={20} />}
        action={
          <Button variant="ghost" size="sm" onClick={() => navigate('/flashcards')}>
            <ArrowLeft size={16} /> Volver
          </Button>
        }
      />

      {(guardado || guardandoOtra) && (
        <Alert variant="success" className="mb-4">
          {guardado ? '✅ Flashcard guardada correctamente. Redirigiendo...' : '✅ Flashcard guardada. Puedes crear otra.'}
        </Alert>
      )}

      <Card>
        <div className="space-y-5">
          {/* Pregunta */}
          <Textarea
            label="Pregunta *"
            placeholder="Escribe la pregunta de tu flashcard..."
            value={form.pregunta}
            onChange={(e) => update('pregunta', e.target.value)}
            rows={3}
            error={errors.pregunta}
          />

          {/* Respuesta */}
          <Textarea
            label="Respuesta *"
            placeholder="Escribe la respuesta completa..."
            value={form.respuesta}
            onChange={(e) => update('respuesta', e.target.value)}
            rows={4}
            error={errors.respuesta}
          />

          {/* Asignatura */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">Asignatura *</label>
            <select
              value={form.asignatura}
              onChange={(e) => update('asignatura', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.asignatura ? 'border-red-300' : 'border-slate-200'}`}
            >
              <option value="">Selecciona una asignatura</option>
              {ASIGNATURAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            {errors.asignatura && <p className="text-xs text-red-600">{errors.asignatura}</p>}
          </div>

          {form.asignatura === 'Otro' && (
            <Input
              label="Nombre de la asignatura"
              placeholder="Ej: Cirugía General, Oftalmología..."
              value={form.asignaturaPersonalizada}
              onChange={(e) => update('asignaturaPersonalizada', e.target.value)}
            />
          )}

          {/* Tema */}
          <Input
            label="Tema *"
            placeholder="Ej: Aparato Respiratorio, Signos Vitales, Diabetes..."
            value={form.tema}
            onChange={(e) => update('tema', e.target.value)}
            error={errors.tema}
          />

          {/* Vista previa */}
          {(form.pregunta || form.respuesta) && (
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Vista previa</p>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  {form.pregunta || 'Pregunta...'}
                </p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-400 mb-1">Respuesta</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">
                    {form.respuesta || 'Respuesta...'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-3 pt-2">
            {!esEdicion && (
              <Button variant="secondary" onClick={() => handleSubmit(true)} className="flex-1">
                Guardar y crear otra
              </Button>
            )}
            <Button onClick={() => handleSubmit(false)} className="flex-1" loading={guardado}>
              {esEdicion ? 'Guardar cambios' : 'Guardar flashcard'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
