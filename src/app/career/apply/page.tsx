import PageHeader from '@/components/page-header';
import ApplyForm from './_components/apply-form';

export default function ApplyPage() {
    return (
        <div className="pb-20">
            <PageHeader
                title="Internship Application at Utsavy"
                subtitle="We're excited to see what you can bring to the team. Fill out the form below to apply."
            />
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="max-w-4xl mx-auto">
                    <ApplyForm />
                </div>
            </div>
        </div>
    );
}
